const axios = require("axios");
const getTokensFromList = require("../getTokensFromList");
const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getGeckoEthereumTokens = require("./getGeckoEthereumTokens");
const getEvmTokensFromCoingecko = require("./getEvmTokensFromCoingecko");

module.exports = async function getEvmTokens(networkId) {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);
  currentTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  if (networkId === "ethereum") {
    const geckoEthTokens = await getGeckoEthereumTokens();
    geckoEthTokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
  } else {
    const alreadyFetchedSet = new Set(
      Array.from(tokensByAddress.values()).map((t) => t.address)
    );
    const geckoTokens = await getEvmTokensFromCoingecko(
      networkId,
      alreadyFetchedSet
    );
    geckoTokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
  }

  // Add from json
  const listTokens = getTokensFromList(networkId);
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
