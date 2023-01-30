const axios = require("axios");
const { PublicKey, Connection } = require("@solana/web3.js");
const { Metadata } = require("@metaplex-foundation/mpl-token-metadata");
const { getMint } = require("@solana/spl-token");
const solanaLabsTokens = require("../assets/solana-labs-tokens.json");
const mints = require("../assets/solana-addresses.json");
const findMetadataPda = require("./findMetadataPda");
const getMultipleAccountsInfoSafe = require("./getMultipleAccountsInfoSafe");

module.exports = async function getSolanaTokens(rpcEndpoint) {
  if (!rpcEndpoint) throw new Error("RPC Endpoint is missing");
  const connection = new Connection(rpcEndpoint);
  const promises = mints.map((mint) => findMetadataPda(new PublicKey(mint)));
  const metadataPdas = await Promise.all(promises);
  const metadataAccountsRes = await getMultipleAccountsInfoSafe(
    connection,
    metadataPdas
  );
  const tokens = [...solanaLabsTokens];
  for (let i = 0; i < metadataAccountsRes.length; i++) {
    const metadataAccountRes = metadataAccountsRes[i];
    if (!metadataAccountRes) continue;
    try {
      const [metadata] = await Metadata.deserialize(metadataAccountRes.data);
      const url = metadata.data.uri.replace(/\x00+/g, "");
      const axiosRes = await axios.get(url);
      const mintAccount = await getMint(connection, metadata.mint);
      const token = {
        chainId: 101,
        address: metadata.mint.toString(),
        decimals: mintAccount.decimals,
        name: metadata.data.name.replace(/\x00+/g, ""),
        symbol: metadata.data.symbol.replace(/\x00+/g, ""),
        logoURI: axiosRes.data.image || undefined,
      };
      tokens.push(token);
    } catch (e) {}
  }
  return tokens.filter((t) => t !== null);
};
