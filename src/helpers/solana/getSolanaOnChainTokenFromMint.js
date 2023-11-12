const Ajv = require("ajv");
const uriSchema = require("../../schemas/uriSchema");
const addFormats = require("ajv-formats");
const listStaticConfigs = require("../../assets/listStaticConfigs.json");
const { Connection } = require("@solana/web3.js");
const { default: axios } = require("axios");
const getSolanaMint = require("./getSolanaMint");
const getTokenMetadata = require("./getTokenMetadata");
const uriValidate = addFormats(new Ajv()).compile(uriSchema);

async function getSolanaOnChainTokenFromMint(mint) {
  const rpcEndpoint = listStaticConfigs.solana?.rpcEndpoint;
  if (!rpcEndpoint)
    throw new Error("List static config or rpcEndpoint is missing ");

  // Decimals
  const connection = new Connection(rpcEndpoint);
  const mintResponse = await getSolanaMint(connection, mint);
  if (!mintResponse) return null;
  const decimals = mintResponse.decimals;

  // TokenMetadata
  const metadata = await getTokenMetadata(connection, mint);
  if (!metadata) return null;
  const { uri } = metadata;
  if (!uri) return null;
  const uriRes = await axios.get(uri);
  const isUriValid = uriValidate(uriRes.data.image);
  const logoURI = isUriValid ? uriRes.data.image : undefined;
  if (!logoURI || logoURI === "") return null;

  return {
    chainId: 101,
    address: mint,
    symbol: metadata.symbol || undefined,
    name: metadata.name || undefined,
    decimals,
    logoURI,
  };
}
module.exports = getSolanaOnChainTokenFromMint;
