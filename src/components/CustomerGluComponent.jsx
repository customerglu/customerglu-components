import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { initializeCustomerGlu } from './CustomerGluSingleton';

const CustomerGluComponent = ({
  userId = '',
  gluToken,
  children,
  region = 'in',
  writeKey = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("initializeCustomerGlu React Component");
        await initializeCustomerGlu(writeKey, userId, gluToken, region);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    initialize();
  }, [userId, gluToken, region, writeKey]);
  if (error) {
    return <></>;
  }
  return isLoading ? <></> : children;
};

CustomerGluComponent.propTypes = {
  userId: PropTypes.string,
  gluToken: PropTypes.string.isRequired,
  children: PropTypes.node,
  region: PropTypes.oneOf(['in', 'us','me']),
  writeKey: PropTypes.string,
};

export default CustomerGluComponent;