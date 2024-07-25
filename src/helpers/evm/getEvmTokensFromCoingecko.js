const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const axios = require("axios");
const { getAddress } = require("@ethersproject/address");
const { StaticJsonRpcProvider } = require("@ethersproject/providers");
const listStaticConfigs = require("../../assets/listStaticConfigs.json");
const coingeckoPlatformFromNetworkId = require("../coingeckoPlatformFromNetworkId");
const sleep = require("../sleep");
const getErc20Decimals = require("./getErc20Decimals");
const uriSchema = require("../../schemas/uriSchema");
const getCoingeckoCoinsList = require("../getCoingeckoCoinsList");

const uriValidate = addFormats(new Ajv()).compile(uriSchema);

module.exports = async function getEvmTokensFromCoingecko(
  networkId,
  currentTokensMap
) {
  const coinsList = await getCoingeckoCoinsList();
  const tokensByAddress = new Map();
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

  for (let i = 0; i < coinsList.length; i++) {
    const coin = coinsList[i];
    if (!coin.id || !coin.platforms || !coin.platforms[platform]) continue;
    let address;
    try {
      address = getAddress(coin.platforms[platform]);
    } catch (error) {
      continue;
    }

    if (currentTokensMap.get(address) && Math.random() > 0.05) {
      tokensByAddress.set(address, currentTokensMap.get(address));
      continue;
    }
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
    await sleep(5000);
    if (!coinDetailsResponse || !coinDetailsResponse.data) continue;
    const coinDetails = coinDetailsResponse.data;
    let decimals =
      coinDetails.detail_platforms?.[platform].decimal_place || null;
    if (decimals === null) decimals = await getErc20Decimals(address, provider);
    if (decimals === null) continue;
    const isUriValid = uriValidate(coinDetails.image.small);
    const logoURI = isUriValid ? coinDetails.image.small : undefined;
    const token = {
      chainId,
      address,
      decimals,
      name: coinDetails.name,
      symbol: coinDetails.symbol.toUpperCase(),
      logoURI,
      extensions: {
        coingeckoId: coinDetails.id,
      },
    };
    tokensByAddress.set(address, token);
  }
  await sleep(30000);
  return Array.from(tokensByAddress.values());
};
