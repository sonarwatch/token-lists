const evmSchema = require("@uniswap/token-lists/src/tokenlist.schema.json");
const aptosSchema = {
  ...evmSchema,
};
aptosSchema.definitions.TokenInfo.properties.address.pattern = "^0x.+$";
aptosSchema.definitions.TokenInfo.properties.address.examples = [
  "0x1::aptos_coin::AptosCoin",
  "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
];
module.exports = aptosSchema;
