const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const axios = require("axios");
const { getAddress } = require("@ethersproject/address");
const listStaticConfigs = require("../../assets/listStaticConfigs.json");
const coingeckoPlatformFromNetworkId = require("../coingeckoPlatformFromNetworkId");
const sleep = require("../sleep");
const uriSchema = require("../../schemas/uriSchema");
const { Connection, PublicKey } = require("@solana/web3.js");
const { getMint } = require("@solana/spl-token");

const uriValidate = addFormats(new Ajv()).compile(uriSchema);

module.exports = async function getSolanaTokensFromCoingecko(
  networkId,
  baseTokens
) {
  console.log("getSolanaTokensFromCoingecko:");
  const currentList = await axios
    .get(
      `https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.${networkId}.tokenlist.json`
    )
    .catch(() => null);
  console.log("currentList:", currentList);

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
  console.log("rpcEndpoint:", rpcEndpoint);
  if (!rpcEndpoint)
    throw new Error("List static config or rpcEndpoint is missing ");
  const connection = new Connection(rpcEndpoint);

  for (let i = 0; i < coinsListRes.data.length; i++) {
    const coin = coinsListRes.data[i];
    console.log("coin:", coin);
    if (!coin.id || !coin.platforms || !coin.platforms[platform]) continue;
    const address = coin.platforms[platform];
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
      .catch((e) => {
        console.error(e);
      });
    await sleep(4000);
    if (!coinDetailsResponse || !coinDetailsResponse.data) continue;
    const coinDetails = coinDetailsResponse.data;
    console.log("coinDetails:", coinDetails);

    const { decimals } = await getMint(connection, new PublicKey(address));
    console.log("decimals:", decimals);

    if (decimals === null) continue;
    const isUriValid = uriValidate(coinDetails.image.small);
    const logoURI = isUriValid ? coinDetails.image.small : undefined;
    const token = {
      chainId,
      address,
      decimals,
      name: coinDetails.name.substring(0, 64),
      symbol: coinDetails.symbol.toUpperCase().replaceAll(" ", ""),
      logoURI,
      extensions: {
        coingeckoId: coinDetails.id,
      },
    };
    console.log("token:", token);
    tokensByAddress.set(address, token);
  }
  await sleep(10000);
  return Array.from(tokensByAddress.values());
};
