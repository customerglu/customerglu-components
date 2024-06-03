import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const CustomerGluComponent = ({ writeKey, userId }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const initializeCustomerGlu = () => {
      if (window.CustomerGlu) {
        new window.CustomerGlu(writeKey, { userId }, {});
        console.log("CustomerGlu initialized");
      } else {
        console.error("CustomerGlu is not available");
      }
    };

    if (scriptLoaded) {
      initializeCustomerGlu();
    }
  }, [scriptLoaded, writeKey, userId]);

  return (
    <>
      <Helmet>
        <script
          src="http://127.0.0.1:8080/sdk.js"
          async
          onLoad={() => {
            console.log("Script loaded successfully");
            setScriptLoaded(true);
          }}
          onError={(error) => {
            console.error("Error loading script:", error);
            setScriptError(true);
          }}
        />
      </Helmet>
      <div id="embedId"></div>
      {scriptError && <p>Error loading the CustomerGlu SDK script.</p>}
    </>
  );
};

CustomerGluComponent.propTypes = {
  writeKey: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

CustomerGluComponent.defaultProps = {
  userId: "",
};

export default CustomerGluComponent;