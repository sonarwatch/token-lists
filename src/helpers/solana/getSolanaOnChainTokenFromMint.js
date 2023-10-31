const Ajv = require("ajv");
const uriSchema = require("../../schemas/uriSchema");
const addFormats = require("ajv-formats");
const listStaticConfigs = require("../../assets/listStaticConfigs.json");
const { Connection, PublicKey } = require("@solana/web3.js");
const { getMint } = require("@solana/spl-token");
const {
  deserializeMetadata,
  findMetadataPda,
} = require("@metaplex-foundation/mpl-token-metadata");
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const { default: axios } = require("axios");
const uriValidate = addFormats(new Ajv()).compile(uriSchema);

async function getSolanaOnChainTokenFromMint(mint) {
  const rpcEndpoint = listStaticConfigs.solana?.rpcEndpoint;
  if (!rpcEndpoint)
    throw new Error("List static config or rpcEndpoint is missing ");

  // Decimals
  const connection = new Connection(rpcEndpoint);
  const mintResponse = await getMint(connection, new PublicKey(mint)).catch(
    (e) => null
  );
  if (!mintResponse) return null;
  const decimals = mintResponse.decimals;

  // TokenMetadata
  const umi = createUmi(rpcEndpoint);
  const metadataPDA = await findMetadataPda(umi, { mint });
  const metadataAccount = await connection
    .getAccountInfo(new PublicKey(metadataPDA.at(0)))
    .catch((e) => null);
  if (!metadataAccount) return null;
  const metadata = deserializeMetadata(metadataAccount);
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
