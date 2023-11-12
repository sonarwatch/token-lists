const {
  deserializeMetadata,
} = require("@metaplex-foundation/mpl-token-metadata");
const { PublicKey } = require("@solana/web3.js");

function findTokenMetadataPda(mint) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata", "utf8"),
      new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
      new PublicKey(mint).toBuffer(),
    ],
    new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
  )[0];
}

function findToken2022MetadataPda(mint) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata", "utf8"),
      new PublicKey("META4s4fSmpkTbZoUsgC1oBnWB31vQcmnN8giPw51Zu").toBuffer(),
      new PublicKey(mint).toBuffer(),
    ],
    new PublicKey("META4s4fSmpkTbZoUsgC1oBnWB31vQcmnN8giPw51Zu")
  )[0];
}

module.exports = async function getTokenMetadata(connection, mint) {
  const tokenMetadataPda = findTokenMetadataPda(mint);
  const tokenMetadataAccount = await connection
    .getAccountInfo(tokenMetadataPda)
    .catch((e) => null);
  if (tokenMetadataAccount) return deserializeMetadata(tokenMetadataAccount);

  const token2022MetadataPda = findToken2022MetadataPda(mint);
  const token2022MetadataAccount = await connection
    .getAccountInfo(token2022MetadataPda)
    .catch((e) => null);
  if (token2022MetadataAccount)
    return deserializeMetadata(token2022MetadataAccount);
  return null;
};
