const evmSchema = require("../schemas/evmSchema");
const aptosSchema = require("../schemas/aptosSchema");
const bitcoinSchema = require("../schemas/bitcoinSchema");
const solanaSchema = require("../schemas/solanaSchema");

const schemaByNetworkId = {
  aptos: aptosSchema,
  avalanche: evmSchema,
  bitcoin: bitcoinSchema,
  ethereum: evmSchema,
  optimism: evmSchema,
  polygon: evmSchema,
  solana: solanaSchema,
};

module.exports = function getSchemaFromNetworkId(networkId) {
  const schema = schemaByNetworkId[networkId];
  if (!schema) throw new Error(`Schema is missing: ${networkId}`);
  return schema;
};
