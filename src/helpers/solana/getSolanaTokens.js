const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");
const getSolanaTokensFromJup = require("./getSolanaTokensFromJup");

module.exports = async function getSolanaTokens() {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList("solana");
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
  const listTokens = getTokensFromList("solana");
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
