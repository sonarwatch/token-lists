const uniswapSchema = require("@uniswap/token-lists/src/tokenlist.schema.json");

const evmSchema = JSON.parse(JSON.stringify(uniswapSchema));
evmSchema.properties.tokens.maxItems = 300000;
evmSchema.definitions.TokenInfo.properties.name.maxLength = 64;
evmSchema.definitions.TokenInfo.properties.tags.maxItems = 20;
evmSchema.definitions.TokenInfo.properties.symbol.maxLength = 25;
evmSchema.definitions.TagIdentifier.maxLength = 24;
evmSchema.definitions.TagIdentifier.pattern = "^[\\w-]+$";

const valueStringIndex =
  evmSchema.definitions.ExtensionPrimitiveValue.anyOf.findIndex(
    (o) => o.type === "string"
  );
evmSchema.definitions.ExtensionPrimitiveValue.anyOf[valueStringIndex] = {
  ...evmSchema.definitions.ExtensionPrimitiveValue.anyOf[valueStringIndex],
  maxLength: 84,
};

evmSchema.definitions.ExtensionPrimitiveValue.anyOf.push({
  type: "array",
  items: {
    type: "string",
    minLength: 1,
    maxLength: 128,
    pattern: "^[: \\w-]+$",
  },
  maxItems: 20,
});

module.exports = evmSchema;
