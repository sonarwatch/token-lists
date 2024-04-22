const getAddressTypeByNetworkId = require("./getAddressTypeByNetworkId");
const evmSchema = require("../schemas/evmSchema");
const moveSchema = require("../schemas/moveSchema");
const bitcoinSchema = require("../schemas/bitcoinSchema");
const solanaSchema = require("../schemas/solanaSchema");
const cosmosSchema = require("../schemas/cosmosSchema");

const schemas = {
  move: moveSchema,
  evm: evmSchema,
  solana: solanaSchema,
  bitcoin: bitcoinSchema,
  sei: cosmosSchema,
};

module.exports = function getSchemaFromNetworkId(networkId) {
  const addressType = getAddressTypeByNetworkId(networkId);
  const schema = schemas[addressType];
  if (!schema) throw new Error(`Schema is missing: ${networkId}`);
  return schema;
};
