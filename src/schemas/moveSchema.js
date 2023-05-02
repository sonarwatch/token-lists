const evmSchema = require("./evmSchema");

const moveSchema = JSON.parse(JSON.stringify(evmSchema));
moveSchema.definitions.TokenInfo.properties.address.pattern = "^0x.+$";
moveSchema.definitions.TokenInfo.properties.address.examples = [
  "0x1::aptos_coin::AptosCoin",
  "0x1::sui::SUI",
  "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
];
module.exports = moveSchema;
