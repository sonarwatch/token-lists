const evmSchema = require("./evmSchema");

const solanaSchema = JSON.parse(JSON.stringify(evmSchema));
solanaSchema.definitions.TokenInfo.properties.address.pattern =
  "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$";
solanaSchema.definitions.TokenInfo.properties.address.examples = [
  "So11111111111111111111111111111111111111112",
  "sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE",
];
module.exports = solanaSchema;
