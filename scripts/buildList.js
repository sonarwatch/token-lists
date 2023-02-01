require("dotenv").config();
const listStaticConfigs = require("../src/assets/listStaticConfigs.json");
const generateTokens = require("../src/generateTokens");
const generateList = require("../src/generateList");
const getSchemaFromNetworkId = require("../src/helpers/getSchemaFromNetworkId");

const networkId = process.argv[2];
const args = [];
// switch (networkId) {
//   case "solana":
//     args.push(...);
//     break;
// }
const listStaticConfig = listStaticConfigs[networkId];
if (!listStaticConfig) {
  throw new Error(`Static config is missing: ${networkId}`);
}

(async () => {
  const tokens = await generateTokens(networkId, args);
  const config = {
    ...listStaticConfig,
    tokens,
    schema: getSchemaFromNetworkId(networkId),
  };
  const list = generateList(config);
  console.log(JSON.stringify(list, null, 2));
})();
