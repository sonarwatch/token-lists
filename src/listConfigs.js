const evmSchema = require("@uniswap/token-lists/src/tokenlist.schema.json");
const aptosSchema = require("./schemas/aptosSchema");
const polygonTokens = require("./tokens/polygon.json");
const avalancheTokens = require("./tokens/avalanche.json");
const aptosTokens = require("./tokens/aptos.json");

const listConfigs = [
  {
    id: "polygon",
    name: "Polygon",
    tokens: polygonTokens,
    addressType: "evm",
    schema: evmSchema,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE/logo.png",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    tokens: avalancheTokens,
    addressType: "evm",
    schema: evmSchema,
    chainId: 43114,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE/logo.png",
  },
  {
    id: "aptos",
    name: "Aptos",
    tokens: aptosTokens,
    addressType: "aptos",
    schema: aptosSchema,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE/logo.png",
  },
];
module.exports = listConfigs;
