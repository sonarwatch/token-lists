const { default: axios } = require("axios");
const getSolanaOnChainTokenFromMint = require("./getSolanaOnChainTokenFromMint");
const sleep = require("../sleep");
const shuffleArray = require("../shuffleArray");
const saveImage = require("../saveImage");
const { publicBearerToken } = require("@sonarwatch/portfolio-core");
const listStaticConfigs = require("../../../src/assets/listStaticConfigs.json");

module.exports = async function getSolanaTokensFromJup(alreadyFetchedSet) {
  const response = await axios.get("https://token.jup.ag/all", {}).catch(() => {
    throw new Error("Unable to fetch jup list");
  });
  if (!response || !response.data) return [];
  const tokens = [];
  const jupTokens = response.data;
  for (let i = 0; i < jupTokens.length; i++) {
    const jupToken = jupTokens[i];
    if (jupToken.chainId !== listStaticConfigs.solana.chainId) continue;
    if (alreadyFetchedSet.has(jupToken.address)) continue;

    const isSave = await saveImage(
      jupToken.logoURI,
      `images/solana/${jupToken.address}.png`
    );
    if (!isSave) continue;
    jupToken.logoURI = tokens.push({
      ...jupToken,
      logoURI: `https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/solana/${jupToken.address}.png`,
    });
  }
  return tokens;
};
