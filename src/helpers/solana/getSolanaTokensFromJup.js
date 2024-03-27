const { default: axios } = require("axios");
const getSolanaOnChainTokenFromMint = require("./getSolanaOnChainTokenFromMint");
const sleep = require("../sleep");
const shuffleArray = require("../shuffleArray");
const saveImage = require("../saveImage");
const { publicBearerToken } = require("@sonarwatch/portfolio-core");
const listStaticConfigs = require("../../../src/assets/listStaticConfigs.json");
const runInBatch = require("../runInBatch");

module.exports = async function getSolanaTokensFromJup(currentTokensSet) {
  const response = await axios.get("https://token.jup.ag/all", {}).catch(() => {
    throw new Error("Unable to fetch jup list");
  });
  if (!response || !response.data) return [];

  const tokens = new Map();
  const jupTokens = response.data;
  const jupTokensToFetch = [];

  for (let i = 0; i < jupTokens.length; i++) {
    const jupToken = jupTokens[i];
    if (jupToken.chainId !== listStaticConfigs.solana.chainId) continue;
    tokens.set(jupToken.address, {
      ...jupToken,
      logoURI: `https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/solana/${jupToken.address}.webp`,
      tags: [...(jupToken.tags || []), "from-jupiter"],
    });
    if (!currentTokensSet.has(jupToken.address) || Math.random() < 0.000001) {
      jupTokensToFetch.push(jupToken);
    }
  }

  runInBatch(
    jupTokensToFetch.map((jupToken) => {
      return async () => {
        await saveImage(
          jupToken.logoURI,
          `images/solana/${jupToken.address}.webp`
        );
      };
    })
  );

  return Array.from(tokens.values());
};
