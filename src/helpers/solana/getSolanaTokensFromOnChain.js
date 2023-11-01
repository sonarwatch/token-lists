const { default: axios } = require("axios");
const getSolanaOnChainTokenFromMint = require("./getSolanaOnChainTokenFromMint");
const sleep = require("../sleep");
const shuffleArray = require("../shuffleArray");
const saveImage = require("../saveImage");

module.exports = async function getSolanaTokensFromOnChain(alreadyFetchedSet) {
  // Get SonarWatch priced mints
  const response = await axios
    .get("https://portfolio-api.sonar.watch/v1/portfolio/cache/")
    .catch((e) => null);
  if (!response) return [];
  const data = response.data;
  if (!data) return [];
  const tokens = [];
  let mints = data
    .filter((str) => str.startsWith("tokenpricesource/solana/"))
    .map((str) => str.replace("tokenpricesource/solana/", ""));
  mints = shuffleArray(mints);
  for (let i = 0; i < mints.length; i++) {
    const mint = mints[i];
    if (alreadyFetchedSet.has(mint)) continue;
    const token = await getSolanaOnChainTokenFromMint(mint).catch((e) => null);
    await sleep(500);
    if (!token) continue;
    await saveImage(token.logoURI, `images/solana/${token.address}.png`);
    token.logoURI = tokens.push({
      ...token,
      logoURI: `https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/solana/${token.address}.png`,
    });
  }
  return tokens;
};
