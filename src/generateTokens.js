const aptosTokens = require("./tokens/aptos.json");
const avalancheTokens = require("./tokens/avalanche.json");
const optimismTokens = require("./tokens/optimism.json");
const polygonTokens = require("./tokens/polygon.json");
const solanaTokens = require("./tokens/solana.json");
const getEthereumTokens = require("./helpers/evm/getEthereumTokens");
const getEvmTokensFromCoingecko = require("./helpers/evm/getEvmTokensFromCoingecko");

const tokenGenerators = {
  aptos: () => aptosTokens,
  avalanche: () => getEvmTokensFromCoingecko("avalanche", avalancheTokens),
  ethereum: getEthereumTokens,
  optimism: () => getEvmTokensFromCoingecko("optimism", optimismTokens),
  polygon: () => getEvmTokensFromCoingecko("polygon", polygonTokens),
  solana: () => solanaTokens,
};

module.exports = async function generateTokens(networkId, args) {
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  return tokenGenerator(...args);
};
