const evmSchema = require("./evmSchema");

const bitcoinSchema = JSON.parse(JSON.stringify(evmSchema));
bitcoinSchema.definitions.TokenInfo.properties.address.pattern = "^bitcoin$";
bitcoinSchema.definitions.TokenInfo.properties.address.examples = ["bitcoin"];
module.exports = bitcoinSchema;
