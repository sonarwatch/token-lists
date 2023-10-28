const evmSchema = require("./evmSchema");

const starknetSchema = JSON.parse(JSON.stringify(evmSchema));
starknetSchema.definitions.TokenInfo.properties.address.pattern =
  "^0x[a-fA-F0-9]{64}$";
starknetSchema.definitions.TokenInfo.properties.address.examples = [
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
];
module.exports = starknetSchema;
