const { getAddress } = require("@ethersproject/address");
const axios = require("axios");

module.exports = async function getEthereumTokens() {
  const res = await axios.get("https://tokens.coingecko.com/uniswap/all.json");
  if (!res || !res.data || !res.data.tokens)
    throw new Error("Failed to fetch uniswap list");
  return res.data.tokens.map((t) => ({
    ...t,
    address: getAddress(t.address),
  }));
};
