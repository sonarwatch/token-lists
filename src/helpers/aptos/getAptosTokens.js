const getAptosTokensFromCoingecko = require("./getAptosTokensFromCoingecko");
const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");

const networkId = "aptos";

module.exports = async function getAptosTokens() {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);
  currentTokens.forEach((token) => {
    if (Math.random() < 0.1) return;
    tokensByAddress.set(token.address, token);
  });

  // Add from json
  const listTokens = getTokensFromList(networkId);
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from coingecko
  let alreadyFetchedSet = new Set(
    Array.from(tokensByAddress.values()).map((t) => t.address)
  );
  const geckoTokens = await getAptosTokensFromCoingecko(alreadyFetchedSet);
  geckoTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Set current if not replaced
  currentTokens.forEach((token) => {
    if (tokensByAddress.has(token.address)) return;
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
