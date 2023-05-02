const { getAddress } = require("@ethersproject/address");
const isSolanaAddress = require("./isSolanaAddress");

module.exports = function isAddressValidAndFormated(address, addressType) {
  let isValid = false;
  switch (addressType) {
    case "move":
      isValid = address === address;
      break;
    case "bitcoin":
      isValid = address === "bitcoin";
      break;
    case "evm":
      isValid = getAddress(address) === address;
      break;
    case "solana":
      isValid = isSolanaAddress(address);
      break;
  }
  return isValid;
};
