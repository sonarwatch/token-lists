const getSolanaTokensFromCoingecko = require("./getSolanaTokensFromCoingecko");
const getSolanaTokensFromOnChain = require("./getSolanaTokensFromOnChain");
const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");
const getSolanaTokensFromJup = require("./getSolanaTokensFromJup");
const indexes = require("./indexes.json");

module.exports = async function getSolanaTokens(networkId) {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);
  const currentTokensSet = new Set();
  currentTokens.forEach((token) => {
    currentTokensSet.add(token.address);
  });

  // Add from jup
  const jupTokens = await getSolanaTokensFromJup(currentTokensSet);
  jupTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from json
  const listTokens = getTokensFromList(networkId);
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Set current if not replaced
  currentTokens.forEach((token) => {
    if (tokensByAddress.has(token.address)) return;
    tokensByAddress.set(token.address, token);
  });

  // Set indexes
  for (const [index, addresses] of Object.entries(indexes)) {
    [...addresses, index].forEach((address) => {
      const token = tokensByAddress.get(address);
      if (!token) return;
      if (!token.extensions) token.extensions = {};
      token.extensions.index = index;
    });
  }

  return Array.from(tokensByAddress.values());
};
