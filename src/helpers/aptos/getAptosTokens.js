const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");
const getTokensFromCoingecko = require("../getTokensFromCoingecko");

const networkId = "aptos";

module.exports = async function getAptosTokens() {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);

  const currentTokensMap = new Map(currentTokens.map((t) => [t.address, t]));
  const geckoTokens = await getTokensFromCoingecko(networkId, currentTokensMap);
  geckoTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from json
  const listTokens = getTokensFromList(networkId);
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
