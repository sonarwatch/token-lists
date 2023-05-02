const evmSchema = require("../schemas/evmSchema");
const moveSchema = require("../schemas/moveSchema");
const bitcoinSchema = require("../schemas/bitcoinSchema");
const solanaSchema = require("../schemas/solanaSchema");

const schemaByNetworkId = {
  aptos: moveSchema,
  avalanche: evmSchema,
  bitcoin: bitcoinSchema,
  ethereum: evmSchema,
  optimism: evmSchema,
  polygon: evmSchema,
  solana: solanaSchema,
  sui: moveSchema,
};

module.exports = function getSchemaFromNetworkId(networkId) {
  const schema = schemaByNetworkId[networkId];
  if (!schema) throw new Error(`Schema is missing: ${networkId}`);
  return schema;
};
