const tokenIndexesByNetworkId = require("./tokenIndexes");
const tokenExtensionsByNetworkId = require("./tokenExtensions.json");
const bitcoinTokens = require("./tokens/bitcoin.json");
const zksyncTokens = require("./tokens/zksync.json");
const seiTokens = require("./tokens/sei.json");
const getEvmTokens = require("./helpers/evm/getEvmTokens");
const getSolanaTokens = require("./helpers/solana/getSolanaTokens");
const getAptosTokens = require("./helpers/aptos/getAptosTokens");
const getSuiTokens = require("./helpers/sui/getSuiTokens");
const formatToken = require("./helpers/formatToken");
const getTokensFromCurrentList = require("./helpers/getTokensFromCurrentList");

const tokenGenerators = {
  aptos: () => getAptosTokens(),
  avalanche: () => getEvmTokens("avalanche"),
  bitcoin: () => bitcoinTokens,
  bnb: () => getEvmTokens("bnb"),
  arbitrum: () => getEvmTokens("arbitrum"),
  base: () => getEvmTokens("base"),
  cronos: () => getEvmTokens("cronos"),
  gnosis: () => getEvmTokens("gnosis"),
  linea: () => getEvmTokens("linea"),
  scroll: () => getEvmTokens("scroll"),
  zksync: () => zksyncTokens,
  "polygon-zkevm": () => getEvmTokens("polygon-zkevm"),
  ethereum: () => getEvmTokens("ethereum"),
  optimism: () => getEvmTokens("optimism"),
  polygon: () => getEvmTokens("polygon"),
  solana: () => getSolanaTokens(),
  sui: () => getSuiTokens(),
  sei: () => seiTokens,
};

// const currentTokenGenerators = {
//   aptos: () => getTokensFromCurrentList("aptos"),
//   avalanche: () => getTokensFromCurrentList("avalanche"),
//   bitcoin: () => bitcoinTokens,
//   bnb: () => getTokensFromCurrentList("bnb"),
//   arbitrum: () => getTokensFromCurrentList("arbitrum"),
//   base: () => getTokensFromCurrentList("base"),
//   cronos: () => getTokensFromCurrentList("cronos"),
//   gnosis: () => getTokensFromCurrentList("gnosis"),
//   linea: () => getTokensFromCurrentList("linea"),
//   scroll: () => getTokensFromCurrentList("scroll"),
//   zksync: () => zksyncTokens,
//   "polygon-zkevm": () => getTokensFromCurrentList("polygon-zkevm"),
//   ethereum: () => getTokensFromCurrentList("ethereum"),
//   optimism: () => getTokensFromCurrentList("optimism"),
//   polygon: () => getTokensFromCurrentList("polygon"),
//   solana: () => getTokensFromCurrentList("solana"),
//   sui: () => suiTokens,
//   sei: () => seiTokens,
// };

module.exports = async function generateTokens(networkId, args) {
  // Generate tokens
  const tokenGenerator = tokenGenerators[networkId];
  if (!tokenGenerator) throw new Error(`Generator is missing: ${networkId}`);
  let tokens = await tokenGenerator(...args);
  tokens = tokens.map((t) => formatToken(t));

  // Add token indexes
  const tokenIndexes = tokenIndexesByNetworkId[networkId];
  if (tokenIndexes) {
    const tokensByAddress = new Map();
    tokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
    for (const [iAddress, iAddresses] of Object.entries(tokenIndexes)) {
      iAddresses.forEach((address) => {
        const token = tokensByAddress.get(address);
        if (!token) return;
        if (!token.extensions) token.extensions = {};
        if (!token.extensions.indexedTo) token.extensions.indexedTo = [];

        // If if not already there
        if (!token.extensions.indexedTo.includes(iAddress)) {
          token.extensions.indexedTo.push(iAddress);
        }
      });
    }
    tokens = Array.from(tokensByAddress.values());
  }

  // Add extensions
  const tokenExtensions = tokenExtensionsByNetworkId[networkId];
  if (tokenExtensions) {
    const tokensByAddress = new Map();
    tokens.forEach((token) => {
      tokensByAddress.set(token.address, token);
    });
    for (const [address, extensions] of Object.entries(tokenExtensions)) {
      const token = tokensByAddress.get(address);
      if (!token) return;
      if (!token.extensions) token.extensions = {};
      token.extensions = { ...token.extensions, ...extensions };
    }
    tokens = Array.from(tokensByAddress.values());
  }

  return tokens;
};
