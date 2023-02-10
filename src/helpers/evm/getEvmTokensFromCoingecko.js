const axios = require("axios");
const { getAddress } = require("@ethersproject/address");
const { StaticJsonRpcProvider } = require("@ethersproject/providers");
const listStaticConfigs = require("../../assets/listStaticConfigs.json");
const coingeckoPlatformFromNetworkId = require("../coingeckoPlatformFromNetworkId");
const sleep = require("../sleep");
const getErc20Decimals = require("./getErc20Decimals");

module.exports = async function getEvmTokensFromCoingecko(
  networkId,
  baseTokens
) {
  const currentList = await axios
    .get(
      `https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.${networkId}.tokenlist.json`
    )
    .catch(() => null);

  if (!currentList || !currentList.data || !currentList.data.tokens)
    throw new Error("Failed to fetch current list");

  const coinsListRes = await axios
    .get("https://api.coingecko.com/api/v3/coins/list", {
      params: {
        include_platform: "true",
      },
    })
    .catch(() => null);
  await sleep(60000);
  if (!coinsListRes || !coinsListRes.data)
    throw new Error("Failed to fetch Coingecko's coins list");

  const tokensByAddress = new Map();
  currentList.data.tokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });
  baseTokens.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });

  const platform = coingeckoPlatformFromNetworkId(networkId);
  const chainId = listStaticConfigs[networkId]?.chainId;
  if (!chainId) throw new Error("List static config or chainId is missing ");
  const rpcEndpoint = listStaticConfigs[networkId]?.rpcEndpoint;
  if (!rpcEndpoint)
    throw new Error("List static config or rpcEndpoint is missing ");
  const provider = new StaticJsonRpcProvider(
    {
      url: rpcEndpoint,
    },
    chainId
  );

  for (let i = 0; i < coinsListRes.data.length; i++) {
    const coin = coinsListRes.data[i];
    if (!coin.id || !coin.platforms || !coin.platforms[platform]) continue;
    const address = getAddress(coin.platforms[platform]);
    if (tokensByAddress.get(address)) continue;
    const coinDetailsResponse = await axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: false,
          sparkline: false,
        },
      })
      .catch(() => null);
    await sleep(4000);
    if (!coinDetailsResponse || !coinDetailsResponse.data) continue;
    const coinDetails = coinDetailsResponse.data;
    const decimals = await getErc20Decimals(address, provider);
    if (decimals === null) continue;
    const token = {
      chainId,
      address,
      decimals,
      name: coinDetails.name.substring(0, 64),
      symbol: coinDetails.symbol.toUpperCase(),
      logoURI: coinDetails.image.small,
      extensions: {
        coingeckoId: coinDetails.id,
      },
    };
    tokensByAddress.set(address, token);
  }
  await sleep(10000);
  return Array.from(tokensByAddress.values());
};
