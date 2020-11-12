/**
 *
 * LeftMenuFooter
 *
 */

import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";

import Wrapper from "./Wrapper";
import messages from "./messages.json";

defineMessages(messages);

function LeftMenuFooter() {
  return (
    <Wrapper>
      <div className="poweredBy">
        <FormattedMessage
          id={messages.poweredBy.id}
          defaultMessage={messages.poweredBy.defaultMessage}
          key="poweredBy"
        />
        <a
          key="website"
          href="https://strapi.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acme LTDA
        </a>
      </div>
    </Wrapper>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default LeftMenuFooter;
