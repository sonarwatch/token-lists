const platforms = {
  aptos: "aptos",
  avalanche: "avalanche",
  ethereum: "ethereum",
  optimism: "optimistic-ethereum",
  polygon: "polygon-pos",
  solana: "solana",
  sui: "sui",
};

module.exports = function coingeckoPlatformFromNetworkId(networkId) {
  const platform = platforms[networkId];
  if (!platform) throw new Error("Platform is missing");
  return platform;
};
