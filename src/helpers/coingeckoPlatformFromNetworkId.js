const platforms = {
  aptos: "aptos",
  avalanche: "avalanche",
  bnb: "binance-smart-chain",
  arbitrum: "arbitrum-one",
  base: "base",
  cronos: "cronos",
  gnosis: "xdai",
  linea: "linea",
  scroll: "scroll",
  starknet: "starknet",
  zksync: "zksync",
  "polygon-zkevm": "polygon-zkevm",
  ethereum: "ethereum",
  optimism: "optimistic-ethereum",
  polygon: "polygon-pos",
  solana: "solana",
  sui: "sui",
  sei: "sei",
};

module.exports = function coingeckoPlatformFromNetworkId(networkId) {
  const platform = platforms[networkId];
  if (!platform) throw new Error("Platform is missing");
  return platform;
};
