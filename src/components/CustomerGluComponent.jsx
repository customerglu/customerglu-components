import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { EventEmitter } from "events";

const CustomerGluComponent = ({ userId, gluToken, children }) => {
  const eventEmitter = new EventEmitter();
  const scriptLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const writeKey = "";
    const handleSDKStatusCompleted = () => {
      setIsLoading(false);
    };

    eventEmitter.on("SDK_STATUS_COMPLETED", handleSDKStatusCompleted);

    if (!scriptLoadedRef.current) {
      const script = document.createElement("script");
      script.src = "https://assets.customerglu.com/scripts/sdk/v5.4/sdk.js";
      script.async = true;

      script.onload = () => {
        scriptLoadedRef.current = true;

        if (window.CustomerGlu) {
          const userToken = gluToken;
          new window.CustomerGlu(writeKey, { userId, userToken }, {});
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
        eventEmitter.off("SDK_STATUS_COMPLETED", handleSDKStatusCompleted);
      };
    } else {
      if (window.CustomerGlu) {
        new window.CustomerGlu(writeKey || undefined, { userId, gluToken }, {});
        console.log("CustomerGlu initialized");
      } else {
        console.error("CustomerGlu is not available");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? <>{children}</> : <></>;
};

CustomerGluComponent.propTypes = {
  userId: PropTypes.string,
  gluToken: PropTypes.string.isRequired,
  children: PropTypes.node,
};

CustomerGluComponent.defaultProps = {
  userId: "",
};

export default CustomerGluComponent;
