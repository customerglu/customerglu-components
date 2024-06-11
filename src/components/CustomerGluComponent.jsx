import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { EventEmitter } from "events";

const CustomerGluComponent = ({ userId, gluToken, children }) => {
  const eventEmitter = new EventEmitter();
  const scriptLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const writeKey = "";
    if (!scriptLoadedRef.current) {
      const script = document.createElement("script");
      script.src = "https://assets.customerglu.com/scripts/sdk/v5.1/sdk.js";
      eventEmitter.on("SDK_STATUS_COMPLETED", () => {
        setIsLoading(false);
      });
      script.async = true;

      script.onload = () => {
        scriptLoadedRef.current = true;

        if (window.CustomerGlu) {
          new window.CustomerGlu(writeKey, { userId, gluToken }, {});
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
        if(writeKey) new window.CustomerGlu(writeKey, { userId }, {});
        else new window.CustomerGlu(gluToken? undefined : writeKey, { userId, gluToken }, {})
        console.log("CustomerGlu initialized");
        eventEmitter.on("SDK_STATUS_COMPLETED", () => {
          setIsLoading(false);
        });
      } else {
        console.error("CustomerGlu is not available");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        {children}
      ) : (
        <></>
      )}
    </>
  );
};

CustomerGluComponent.propTypes = {
  userId: PropTypes.string,
  gluToken: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

CustomerGluComponent.defaultProps = {
  userId: "",
};

export default CustomerGluComponent;
