import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { initializeCustomerGlu } from './CustomerGluSingleton';
export const CustomerGluComponent = ({
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
    return <div>Error initializing CustomerGlu: {error.message}</div>;
  }
  return isLoading ? <div>Loading CustomerGlu...</div> : children;
};
CustomerGluComponent.propTypes = {
  userId: PropTypes.string,
  gluToken: PropTypes.string.isRequired,
  children: PropTypes.node,
  region: PropTypes.oneOf(['in', 'us']),
  writeKey: PropTypes.string,
};