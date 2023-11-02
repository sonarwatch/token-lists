const axios = require("axios");
const getSolanaTokensFromCoingecko = require("./getSolanaTokensFromCoingecko");
const getSolanaTokensFromOnChain = require("./getSolanaTokensFromOnChain");
const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");

module.exports = async function getSolanaTokens(networkId) {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);
  currentTokens.forEach((token) => {
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
  const geckoTokens = await getSolanaTokensFromCoingecko(
    "solana",
    alreadyFetchedSet
  );
  geckoTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from on chain metadata (10% chance to bu runned)
  if (Math.random() < 0.1) {
    alreadyFetchedSet = new Set(
      Array.from(tokensByAddress.values()).map((t) => t.address)
    );
    const onChainTokens = await getSolanaTokensFromOnChain(alreadyFetchedSet);
    onChainTokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
  }

  return Array.from(tokensByAddress.values());
};
