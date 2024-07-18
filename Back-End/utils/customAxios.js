const axios = require('axios');
const { PacProxyAgent } = require('pac-proxy-agent');

const createProxyAxiosInstance = (useProxyPac) => {
  const instance = axios.create();
  if (useProxyPac) {
    const agent = new PacProxyAgent(useProxyPac);
    instance.defaults.httpAgent = agent;
    instance.defaults.httpsAgent = agent;
  }
  return instance;
};

module.exports = createProxyAxiosInstance;
