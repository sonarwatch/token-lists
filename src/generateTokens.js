const aptosTokens = require("./tokens/aptos.json");
const avalancheTokens = require("./tokens/avalanche.json");
const polygonTokens = require("./tokens/polygon.json");
const getEthereumTokens = require("./helpers/getEthereumTokens");
const getSolanaTokens = require("./helpers/getSolanaTokens");

const tokenGenerators = {
  aptos: () => aptosTokens,
  avalanche: () => avalancheTokens,
  ethereum: getEthereumTokens,
  polygon: () => polygonTokens,
  solana: getSolanaTokens,
};

module.exports = async function generateTokens(networkId, args) {
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  return tokenGenerator(...args);
};
