const evmSchema = require("./evmSchema");

const cosmosSchema = JSON.parse(JSON.stringify(evmSchema));
cosmosSchema.definitions.TokenInfo.properties.address.pattern =
  "^[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/]+$";
cosmosSchema.definitions.TokenInfo.properties.address.examples = [
  "usei",
  "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
];
module.exports = cosmosSchema;
