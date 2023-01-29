const { PublicKey } = require("@solana/web3.js");

const programId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
module.exports = async function findMetadataPda(address) {
  return (
    await PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata", "utf8"),
        programId.toBuffer(),
        address.toBuffer(),
      ],
      programId
    )
  )[0];
};
