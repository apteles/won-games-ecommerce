"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 *
 * https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity
 *
 * STEPS
 * 1 requisitar URL gog
 * 2 pegar informações de uma jogo especifico
 * 3 criar categorias
 *  3.1 verificar se categoria já existe
 * 4 criar developers
 *  4.1 verificar se developers já existe
 * 5 platform
 *  5.1 verificar se platform já existe
 * 6 publisher
 *  6.1 verificar se publisher já existe
 *
 */
const axios = require("axios");
const slugify = require("slugify");
const qs = require("querystring");


const q = (dom) => (element) => dom.window.document.querySelector(element);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function Exception(error) {
  return { error, data: error.data && error.data.errors && error.data.errors };
}
async function getByName(name, entityName) {
  const item = await strapi.services[entityName].find({ name });
  return item.length ? item[0] : null;
}

async function create(name, entityName) {
  if ((await getByName(name, entityName)) === null) {
    return await strapi.services[entityName].create({
      name,
      slug: slugify(name, { lower: true }),
    });
  }
}

async function getGameInfo(slug) {
  try {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const body = await axios.get(`https://www.gog.com/game/${slug}`);
    const selector = q(new JSDOM(body.data));

    const ratingElement = selector(".age-restrictions__icon use");
    const description = selector(".description");

    return {
      rating: ratingElement
        ? ratingElement
            .getAttribute("xlink:href")
            .replace(/_/g, "")
            .replace(/[^\w-]+/g, "")
        : "FREE",
      short_description: description.textContent.trim().slice(0, 160),
      description: description.innerHTML,
    };
  } catch (error) {
    console.log("[Task:Error]", Exception(error));
  }
}

async function createManyToManyData(products = []) {
  const developers = {};
  const publishers = {};
  const categories = {};
  const platforms = {};

  products.forEach((p) => {
    const { developer, publisher, genres, supportedOperatingSystems } = p;

    genres && genres.forEach((item) => (categories[item] = true));
    supportedOperatingSystems &&
      supportedOperatingSystems.forEach((item) => (platforms[item] = true));
    developers[developer] = true;
    publishers[publisher] = true;
  });

  console.log(`[SERVICE:Task]: Creating Relationships`);

  return Promise.all([
    ...Object.keys(developers).map((name) => create(name, "developer")),
    ...Object.keys(publishers).map((publisher) =>
      create(publisher, "publisher")
    ),
    ...Object.keys(categories).map((category) => create(category, "category")),
    ...Object.keys(platforms).map((platform) => create(platform, "platform")),
  ]);
}

async function createGames(products) {
  await Promise.all(
    products.map(async (product) => {
      const item = await getByName(product.title, "game");

      if (!item) {
        console.log(`[SERVICE:Task]: Creating Game ${product.title}...`);

        const game = await strapi.services.game.create({
          name: product.title,
          slug: product.slug.replace(/_/g, "-"),
          price: product.price.amount,
          release_date: new Date(
            Number(product.globalReleaseDate) * 1000
          ).toISOString(),
          categories: await Promise.all(
            product.genres.map((name) => getByName(name, "category"))
          ),
          platforms: await Promise.all(
            product.supportedOperatingSystems.map((name) =>
              getByName(name, "platform")
            )
          ),
          developers: [await getByName(product.developer, "developer")],
          publisher: await getByName(product.publisher, "publisher"),
          ...(await getGameInfo(product.slug)),
        });

        await setImage({ image: product.image, game });
        await Promise.all(
          product.gallery
            .slice(0, 5)
            .map((url) => setImage({ image: url, game, field: "gallery" }))
        );

        await timeout(2000);

        console.log(`[SERVICE:Task]: Created Game ${product.title}...`);

        return game;
      }
    })
  );
}

async function setImage({ image, game, field = "cover" }) {
  try {
    const url = `https:${image}_bg_crop_1680x655.jpg`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(data, "base64");

    const FormData = require("form-data");
    const formData = new FormData();

    formData.append("refId", game.id);
    formData.append("ref", "game");
    formData.append("field", field);
    formData.append("files", buffer, { filename: `${game.slug}.jpg` });

    console.info(`[SERVICE:Task]: Uploading ${field} image: ${game.slug}.jpg`);

    await axios({
      method: "POST",
      url: `http://${strapi.config.host}:${strapi.config.port}/upload`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
  } catch (error) {
    console.log("[Task:Error]", Exception(error));
  }
}

async function populate(params) {
  try {
    const {
      data: { products },
    } = await axios.get(
      `https://www.gog.com/games/ajax/filtered?mediaType=game&${qs.stringify(
        params
      )}`
    );

    console.log(`[SERVICE]: Game`);

    await createManyToManyData(products);

    console.log(`[SERVICE:Task]: Created Relationships`);

    await createGames(products);

    console.log(`[SERVICE]: Finished Game`);
  } catch (error) {
    console.log("[Service:Error]", Exception(error));
  }
}

module.exports = {
  populate,
};
