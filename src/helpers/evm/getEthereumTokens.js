const { getAddress } = require("@ethersproject/address");
const axios = require("axios");
const ethereumBaseToken = require("../../tokens/ethereum.json");

module.exports = async function getEthereumTokens() {
  const listRes = await axios.get(
    "https://tokens.coingecko.com/uniswap/all.json"
  );
  if (!listRes || !listRes.data || !listRes.data.tokens)
    throw new Error("Failed to fetch Coingecko's token list");

  const coinsListRes = await axios.get(
    "https://api.coingecko.com/api/v3/coins/list",
    {
      params: {
        include_platform: "true",
      },
    }
  );
  if (!coinsListRes || !coinsListRes.data)
    throw new Error("Failed to fetch Coingecko's coins list");

  const idByAddress = new Map();
  coinsListRes.data.forEach((coin) => {
    if (!coin.id || !coin.platforms || !coin.platforms.ethereum) return;
    const address = getAddress(coin.platforms.ethereum);
    idByAddress.set(address, coin.id);
  });

  const tokensByAddress = new Map();

  listRes.data.tokens.forEach((t) => {
    const address = getAddress(t.address);
    const coingeckoId = idByAddress.get(address);
    const token = {
      ...t,
      address,
      extensions: {
        ...(coingeckoId && { coingeckoId }),
      },
    };
    tokensByAddress.set(address, token);
  });

  ethereumBaseToken.forEach((token) => {
    tokensByAddress.set(token.address, token);
  });
  return Array.from(tokensByAddress.values());
};
