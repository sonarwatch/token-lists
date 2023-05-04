const { JsonRpcClient, JsonRpcProvider } = require("@mysten/sui.js");

const rpcClient = new JsonRpcClient("https://explorer-rpc.mainnet.sui.io/");
const provider = new JsonRpcProvider(undefined, {
  rpcClient,
});
const args = process.argv.slice(2);
const coinType = args.at(0);

provider
  .getCoinMetadata({
    coinType,
  })
  .then((coinMetadata) => {
    console.log({ ...coinMetadata, coinType });
  });
