const { default: axios } = require("axios");
const saveImage = require("../saveImage");
const listStaticConfigs = require("../../../src/assets/listStaticConfigs.json");
const runInBatch = require("../runInBatch");
const getCoingeckoCoinsList = require("../getCoingeckoCoinsList");
const coingeckoPlatformFromNetworkId = require("../coingeckoPlatformFromNetworkId");
const sleep = require("../sleep");

// export type JupToken = {
//   address:          string;
//   name:             string;
//   symbol:           string;
//   decimals:         number;
//   logoURI:          null | string;
//   tags:             string[];
//   daily_volume:     number | null;
//   freeze_authority: null | string;
//   mint_authority:   null | string;
// }

async function jupApiGet(path) {
  const response = await axios
    .get(`https://tokens.jup.ag/${path}`, { timeout: 50000 })
    .catch((e) => {
      throw new Error(`Unable to fetch jup list: ${path}`, e);
    });
  if (!response || !response.data) return [];
  return response.data;
}

module.exports = async function getSolanaTokensFromJup(currentTokensSet) {
  const tokensWithMarket = await jupApiGet("tokens_with_markets");
  await sleep(5000);
  const tokensVerified = await jupApiGet("tokens?tags=verified");
  const jupTokensMap = new Map();
  [...tokensWithMarket, ...tokensVerified].forEach((t) => {
    jupTokensMap.set(t.address, t);
  });
  const jupTokens = Array.from(jupTokensMap.values());

  const geckoList = await getCoingeckoCoinsList();
  const solanaGeckoPlatform = coingeckoPlatformFromNetworkId("solana");
  const geckoIds = new Map();
  geckoList.forEach((item) => {
    if (item.platforms && item.platforms[solanaGeckoPlatform] && item.id) {
      geckoIds.set(item.platforms[solanaGeckoPlatform], item.id);
    }
  });

  const tokens = new Map();
  const tokenImagesToFetch = [];

  for (let i = 0; i < jupTokens.length; i++) {
    const jupToken = jupTokens[i];
    const geckoId = geckoIds.get(jupToken.address);
    const extensions = geckoId ? { coingeckoId: geckoId } : undefined;
    tokens.set(jupToken.address, {
      address: jupToken.address,
      chainId: listStaticConfigs.solana.chainId,
      decimals: jupToken.decimals,
      name: jupToken.name,
      symbol: jupToken.symbol,
      logoURI: `https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/solana/${jupToken.address}.webp`,
      extensions,
    });
    if (!currentTokensSet.has(jupToken.address) || Math.random() < 0.01) {
      tokenImagesToFetch.push(jupToken);
    }
  }

  runInBatch(
    tokenImagesToFetch.map((jupToken) => {
      return async () => {
        if (!jupToken.logoURI) return;
        await saveImage(
          jupToken.logoURI,
          `images/solana/${jupToken.address}.webp`
        );
      };
    }),
    10
  );

  return Array.from(tokens.values());
};
