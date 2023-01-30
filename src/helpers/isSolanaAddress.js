const { PublicKey } = require("@solana/web3.js");

module.exports = function isSolanaAddress(address) {
  if (address.length > 44) return false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const publiKey = new PublicKey(address);
    return true;
  } catch (error) {
    // Failed to create PublicKey
  }
  return false;
};
