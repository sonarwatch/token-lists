const evmSchema = require("@uniswap/token-lists/src/tokenlist.schema.json");
const aptosSchema = require("../schemas/aptosSchema");
const solanaSchema = require("../schemas/solanaSchema");

const schemaByNetworkId = {
  solana: solanaSchema,
  aptos: aptosSchema,
  avalanche: evmSchema,
  polygon: evmSchema,
};

module.exports = function getSchemaFromNetworkId(networkId) {
  const schema = schemaByNetworkId[networkId];
  if (!schema) throw new Error(`Schema is missing: ${networkId}`);
  return schema;
};
