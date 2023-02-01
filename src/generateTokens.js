const aptosTokens = require("./tokens/aptos.json");
const avalancheTokens = require("./tokens/avalanche.json");
const optimismTokens = require("./tokens/optimism.json");
const polygonTokens = require("./tokens/polygon.json");
const solanaTokens = require("./tokens/solana.json");
const getEthereumTokens = require("./helpers/getEthereumTokens");

const tokenGenerators = {
  aptos: () => aptosTokens,
  avalanche: () => avalancheTokens,
  ethereum: getEthereumTokens,
  optimism: () => optimismTokens,
  polygon: () => polygonTokens,
  solana: () => solanaTokens,
};

module.exports = async function generateTokens(networkId, args) {
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  return tokenGenerator(...args);
};
