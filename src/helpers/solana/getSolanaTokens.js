const getSolanaTokensFromCoingecko = require("./getSolanaTokensFromCoingecko");
const getSolanaTokensFromOnChain = require("./getSolanaTokensFromOnChain");
const getTokensFromCurrentList = require("../getTokensFromCurrentList");
const getTokensFromList = require("../getTokensFromList");

module.exports = async function getSolanaTokens(networkId) {
  const tokensByAddress = new Map();

  // Fetch from current version
  const currentTokens = await getTokensFromCurrentList(networkId);
  currentTokens.forEach((token) => {
    if (Math.random() < 0.05) return;
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

  // Add from on chain metadata (50% chance to be runned)
  if (Math.random() < 0.5) {
    alreadyFetchedSet = new Set(
      Array.from(tokensByAddress.values()).map((t) => t.address)
    );
    const onChainTokens = await getSolanaTokensFromOnChain(alreadyFetchedSet);
    onChainTokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
  }

  // Set current if not replaced
  currentTokens.forEach((token) => {
    if (tokensByAddress.has(token.address)) return;
    tokensByAddress.set(token.address, token);
  });

  return Array.from(tokensByAddress.values());
};
