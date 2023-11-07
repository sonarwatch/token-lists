const evmSchema = require("../schemas/evmSchema");
const moveSchema = require("../schemas/moveSchema");
const bitcoinSchema = require("../schemas/bitcoinSchema");
const solanaSchema = require("../schemas/solanaSchema");
const cosmosSchema = require("../schemas/cosmosSchema");
const starknetSchema = require("../schemas/starknetSchema");

const schemaByNetworkId = {
  aptos: moveSchema,
  avalanche: evmSchema,
  bitcoin: bitcoinSchema,
  ethereum: evmSchema,
  optimism: evmSchema,
  bnb: evmSchema,
  arbitrum: evmSchema,
  base: evmSchema,
  cronos: evmSchema,
  gnosis: evmSchema,
  linea: evmSchema,
  scroll: evmSchema,
  starknet: starknetSchema,
  zksync: evmSchema,
  "polygon-zkevm": evmSchema,
  polygon: evmSchema,
  solana: solanaSchema,
  sui: moveSchema,
  sei: cosmosSchema,
};

module.exports = function getSchemaFromNetworkId(networkId) {
  const schema = schemaByNetworkId[networkId];
  if (!schema) throw new Error(`Schema is missing: ${networkId}`);
  return schema;
};
