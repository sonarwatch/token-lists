const { default: axios } = require("axios");
const getSolanaOnChainTokenFromMint = require("./getSolanaOnChainTokenFromMint");
const sleep = require("../sleep");
const shuffleArray = require("../shuffleArray");
const saveImage = require("../saveImage");
const { publicBearerToken } = require("@sonarwatch/portfolio-core");

module.exports = async function getSolanaTokensFromOnChain(alreadyFetchedSet) {
  // Get SonarWatch priced mints
  const response = await axios
    .get("https://portfolio-api-public.sonar.watch/v1/portfolio/cache", {
      headers: {
        Authorization: `Bearer ${publicBearerToken}`,
      },
    })
    .catch(() => {
      throw new Error("Unable to fetch portfolio cache");
    });

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
    await sleep(1500);
    if (!token) continue;
    const saved = await saveImage(
      token.logoURI,
      `images/solana/${token.address}.png`
    );
    if (!saved) continue;
    token.logoURI = tokens.push({
      ...token,
      logoURI: `https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/solana/${token.address}.png`,
    });
  }
  return tokens;
};
