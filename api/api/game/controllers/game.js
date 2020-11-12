"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
function log(message) {
  console.log(`>>>> ${message}`);
}
async function populate({ request, response, query }) {
  const options = {
    page: "1",
    sort: "popularity",
    ...query,
  };
  log("🚀 Starting to populate...");
  await strapi.services.game.populate(options);
  log("✔️ Done");
}

module.exports = {
  populate,
};
