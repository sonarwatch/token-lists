const aptosTokens = require("./tokens/aptos.json");
const bitcoinTokens = require("./tokens/bitcoin.json");
const starknetTokens = require("./tokens/starknet.json");
const zksyncTokens = require("./tokens/zksync.json");
const suiTokens = require("./tokens/sui.json");
const seiTokens = require("./tokens/sei.json");
const getEvmTokens = require("./helpers/evm/getEvmTokens");
const getSolanaTokens = require("./helpers/solana/getSolanaTokens");

const tokenGenerators = {
  aptos: () => aptosTokens,
  avalanche: () => getEvmTokens("avalanche"),
  bitcoin: () => bitcoinTokens,
  bnb: () => getEvmTokens("bnb"),
  arbitrum: () => getEvmTokens("arbitrum"),
  base: () => getEvmTokens("base"),
  cronos: () => getEvmTokens("cronos"),
  gnosis: () => getEvmTokens("gnosis"),
  linea: () => getEvmTokens("linea"),
  scroll: () => getEvmTokens("scroll"),
  starknet: () => starknetTokens,
  zksync: () => zksyncTokens,
  "polygon-zkevm": () => getEvmTokens("polygon-zkevm"),
  ethereum: () => getEvmTokens("ethereum"),
  optimism: () => getEvmTokens("optimism"),
  polygon: () => getEvmTokens("polygon"),
  solana: () => getSolanaTokens("solana"),
  sui: () => suiTokens,
  sei: () => seiTokens,
};

module.exports = async function generateTokens(networkId, args) {
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  return tokenGenerator(...args);
};
