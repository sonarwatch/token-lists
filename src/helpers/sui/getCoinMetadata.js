const { JsonRpcClient, JsonRpcProvider } = require("@mysten/sui.js");

const rpcClient = new JsonRpcClient("https://fullnode.mainnet.sui.io/");
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
    const token = {
      chainId: 1,
      address: coinType,
      decimals: coinMetadata.decimals,
      name: coinMetadata.name,
      symbol: coinMetadata.symbol,
      logoURI: coinMetadata.iconUrl ? coinMetadata.iconUrl : undefined,
    };
    console.log(JSON.stringify(token, null, 2));
  });
