let instance = null;
let isInitialized = false;
let isLoading = false;
let initializationPromise = null;

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const initializeCustomerGlu = async (writeKey, userId, userToken, region = 'in') => {
  if (isInitialized) {
    // console.log("CustomerGlu instance already created");
    instance.register(writeKey, { userId, userToken }, {});
    return instance;
  }

  if (isLoading) {
    // console.log("CustomerGlu instance isLoading");

    return initializationPromise;
  }

  isLoading = true;
  initializationPromise = (async () => {
    try {
      const scriptSrc = region === 'us'
        ? 'https://assets-us.customerglu.com/scripts/sdk/v6.0/sdk.js'
        :region === 'me'
        ? 'https://assets-me.customerglu.com/scripts/sdk/v0.0.1/sdk.js'
        :'https://assets.customerglu.com/scripts/sdk/v5.5/sdk.js';
      
      await loadScript(scriptSrc);

      if (!window.CustomerGlu) {
        throw new Error('CustomerGlu failed to load');
      }

      instance = new window.CustomerGlu(writeKey, { userId, userToken }, {});

      
      
      isInitialized = true;
      // console.log('CustomerGlu initialized: React Web SDK v1.5.5');
      return instance;
    } catch (error) {
      console.error('Error initializing CustomerGlu:', error);
      throw error;
    } finally {
      isLoading = false;
    }
  })();

  return initializationPromise;
};