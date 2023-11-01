const axios = require("axios");
const getSolanaTokensFromCoingecko = require("./getSolanaTokensFromCoingecko");
const getSolanaTokensFromOnChain = require("./getSolanaTokensFromOnChain");
const getTokensFromList = require("../getTokensFromList");

module.exports = async function getSolanaTokens(networkId, baseTokens) {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentList = await axios
    .get(
      `https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.${networkId}.tokenlist.json`
    )
    .catch(() => null);
  if (!currentList || !currentList.data || !currentList.data.tokens)
    throw new Error("Failed to fetch current list");
  currentList.data.tokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from json
  const listTokens = getTokensFromList(networkId);
  listTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  // Add from coingecko
  let alreadyFetchedSet = new Set(Array.from(tokensByAddress.values()));
  // const geckoTokens = await getSolanaTokensFromCoingecko(
  //   "solana",
  //   alreadyFetchedSet
  // );
  // geckoTokens.forEach((token) => {
  //   tokensByAddress.set(token.address, token);
  // });

  // Add from on chain metadata
  alreadyFetchedSet = new Set(Array.from(tokensByAddress.values()));
  const onChainTokens = await getSolanaTokensFromOnChain(alreadyFetchedSet);
  onChainTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
