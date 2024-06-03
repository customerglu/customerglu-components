import { useEffect,useState, useRef } from "react";
import PropTypes from "prop-types";

const CustomerGluComponent = ({ writeKey, userId }) => {
  const [loading, setLoading] = useState(true);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current) {
      const script = document.createElement("script");
      script.src = "http://192.168.1.4:8080/sdk.js";
      script.async = true;

      script.onload = () => {
        console.log("Script loaded successfully");
        scriptLoadedRef.current = true;
        if (window.CustomerGlu) {
          new window.CustomerGlu(writeKey, { userId }, {});
          setLoading(false);
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
        scriptLoadedRef.current = false;
      };
    } else {
      // If script is already loaded, initialize the SDK directly
      if (window.CustomerGlu) {
        new window.CustomerGlu(writeKey, { userId }, {});
        console.log("CustomerGlu initialized");
      } else {
        console.error("CustomerGlu is not available");
      }
    }
  }, [writeKey, userId]);

  return (
    loading ? (
      <h1>Loading CustomerGlu...</h1>
    ) : (
      <></>
    )
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
