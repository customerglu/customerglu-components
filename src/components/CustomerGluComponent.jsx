import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import animationData from "../assets/simpleLoader.json";
import { EventEmitter } from "events";

const CustomerGluComponent = ({ writeKey, userId }) => {
  const eventEmitter = new EventEmitter();
  const scriptLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!scriptLoadedRef.current) {
//       const script = document.createElement("script");
//       script.src = "http://192.168.1.4:8080/sdk.js";
//       eventEmitter.on('SDK_STATUS_COMPLETED', () => {
//         console.log('SDK_STATUS_COMPLETED')
//         // setIsLoading(false);
//       });
//       script.async = true;

//       script.onload = () => {
//         console.log("Script loaded successfully");
//         scriptLoadedRef.current = true;

//         if (window.CustomerGlu) {
//           new window.CustomerGlu(writeKey, { userId }, {});
//           console.log("CustomerGlu initialized");
//         } else {
//           console.error("CustomerGlu is not available");
//         }
//       };

//       script.onerror = (error) => {
//         console.error("Error loading script:", error);
//       };

//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//         scriptLoadedRef.current = false;
//       };
//     } else {
//       // If script is already loaded, initialize the SDK directly
//       if (window.CustomerGlu) {
//         new window.CustomerGlu(writeKey, { userId }, {});
//         console.log("CustomerGlu initialized");
//         // setIsLoading(false);
//       } else {
//         console.error("CustomerGlu is not available");
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <>
      {isLoading ? (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
          {console.log("Loading...")}
          <Lottie options={defaultOptions}/>
        </div>
      ) : (
        <></>
      )}
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
