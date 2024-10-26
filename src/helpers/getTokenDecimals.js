const { SuiClient, SuiHTTPTransport } = require("@mysten/sui.js/client");
const { Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");
const getAptosDecimals = require("./aptos/getAptosDecimals");
const listStaticConfigs = require("../assets/listStaticConfigs.json");

async function getTokenDecimalsAptos(address) {
  const config = new AptosConfig({
    network: Network.MAINNET,
    fullnode: listStaticConfigs["aptos"].rpcEndpoint,
  });
  const client = new Aptos(config);

  const accountAddress = address.split("::").at(0);
  const res = await client
    .getAccountResource({
      accountAddress: accountAddress,
      resourceType: `0x1::coin::CoinInfo<${address}>`,
    })
    .catch(() => undefined);
  return res?.decimals || null;
}

async function getTokenDecimalsSui(address) {
  const client = new SuiClient({
    transport: new SuiHTTPTransport({
      url: listStaticConfigs["sui"].rpcEndpoint,
    }),
  });

  const coinMetadata = await client.getCoinMetadata({ coinType: address });
  if (coinMetadata) return coinMetadata.decimals;
  return null;
}

const getTokenDecimalsFunctions = {
  aptos: getTokenDecimalsAptos,
  sui: getTokenDecimalsSui,
};

module.exports = async function getTokenDecimals(networkId, address) {
  const fct = getTokenDecimalsFunctions[networkId];
  if (!fct)
    throw new Error(`Get Token Decimals Function is missing: ${networkId}`);
  const decimals = await fct(address);
  return decimals;
};
