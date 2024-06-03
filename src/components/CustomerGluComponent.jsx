import { useEffect } from "react";
import PropTypes from "prop-types";

const CustomerGluComponent = ({ writeKey, userId }) => {
  useEffect(() => {
    const initializeCustomerGlu = () => {
      if (window.CustomerGlu) {
        new window.CustomerGlu(writeKey, { userId }, {});
        console.log("CustomerGlu initialized");
      } else {
        console.error("CustomerGlu is not available");
      }
    };

    const existingScript = document.querySelector(`script[src="https://assets.customerglu.com/scripts/sdk/v5.0/sdk.js"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "http://127.0.0.1:8080/sdk.js";
      script.async = true;

      script.onload = () => {
        console.log("Script loaded successfully");
        initializeCustomerGlu();
      };

      script.onerror = (error) => {
        console.error("Error loading script:", error);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      // If the script already exists, just initialize the SDK
      initializeCustomerGlu();
    }
  }, [writeKey, userId]);

  return <div id="embedId"></div>;
};

CustomerGluComponent.propTypes = {
  writeKey: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

CustomerGluComponent.defaultProps = {
  userId: "",
};

export default CustomerGluComponent;
