import { useEffect } from "react";
import PropTypes from "prop-types";

const CustomerGluComponent = ({ writeKey, userId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.customerglu.com/scripts/sdk/v5.0/sdk.js";
    script.async = true;

    script.onload = () => {
      console.log("Script loaded successfully");
      if (window.CustomerGlu) {
        new window.CustomerGlu(writeKey, { userId }, {});
        console.log("CustomerGlu initialized");
      } else {
        console.error("CustomerGlu is not available");
      }
    };
    script.onerror = (error) => {
      console.error("Error loading script:", error);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  return (
    <></>
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
