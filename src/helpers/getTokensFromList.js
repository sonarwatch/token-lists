const aptosTokens = require("../tokens/aptos.json");
const avalancheTokens = require("../tokens/avalanche.json");
const bitcoinTokens = require("../tokens/bitcoin.json");
const bnbTokens = require("../tokens/bnb.json");
const arbitrumTokens = require("../tokens/arbitrum.json");
const baseTokens = require("../tokens/base.json");
const cronosTokens = require("../tokens/cronos.json");
const gnosisTokens = require("../tokens/gnosis.json");
const lineaTokens = require("../tokens/linea.json");
const scrollTokens = require("../tokens/scroll.json");
const starknetTokens = require("../tokens/starknet.json");
const zksyncTokens = require("../tokens/zksync.json");
const polygonZkEvmTokens = require("../tokens/polygon-zkevm.json");
const optimismTokens = require("../tokens/optimism.json");
const polygonTokens = require("../tokens/polygon.json");
const solanaTokens = require("../tokens/solana.json");
const suiTokens = require("../tokens/sui.json");
const seiTokens = require("../tokens/sei.json");
const ethereumTokens = require("../tokens/ethereum.json");

const lists = {
  aptos: aptosTokens,
  avalanche: avalancheTokens,
  bitcoin: bitcoinTokens,
  bnb: bnbTokens,
  arbitrum: arbitrumTokens,
  base: baseTokens,
  cronos: cronosTokens,
  gnosis: gnosisTokens,
  linea: lineaTokens,
  scroll: scrollTokens,
  starknet: starknetTokens,
  zksync: zksyncTokens,
  "polygon-zkevm": polygonZkEvmTokens,
  ethereum: ethereumTokens,
  optimism: optimismTokens,
  polygon: polygonTokens,
  solana: solanaTokens,
  sui: suiTokens,
  sei: seiTokens,
};

module.exports = function getTokensFromList(networkId) {
  const list = lists[networkId];
  if (!list) throw new Error("List is missing");

  const tokens = [];
  list.forEach((token) => {
    tokens.push(token);
  });
  return tokens;
};
