const uniswapSchema = require("@uniswap/token-lists/src/tokenlist.schema.json");

const evmSchema = JSON.parse(JSON.stringify(uniswapSchema));
evmSchema.definitions.TokenInfo.properties.name.maxLength = 64;
evmSchema.definitions.TokenInfo.properties.tags.maxItems = 20;
evmSchema.definitions.TagIdentifier.maxLength = 24;

const valueStringIndex =
  evmSchema.definitions.ExtensionPrimitiveValue.anyOf.findIndex(
    (o) => o.type === "string"
  );
evmSchema.definitions.ExtensionPrimitiveValue.anyOf[valueStringIndex] = {
  ...evmSchema.definitions.ExtensionPrimitiveValue.anyOf[valueStringIndex],
  maxLength: 84,
};

module.exports = evmSchema;
