const polygonTokens = require("./tokens/polygon.json");
const avalancheTokens = require("./tokens/avalanche.json");
const aptosTokens = require("./tokens/aptos.json");
const getSolanaTokens = require("./helpers/getSolanaTokens");

const tokenGenerators = {
  solana: getSolanaTokens,
  aptos: () => aptosTokens,
  polygon: () => polygonTokens,
  avalanche: () => avalancheTokens,
};

module.exports = async function generateTokens(networkId, args) {
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  return tokenGenerator(...args);
};
