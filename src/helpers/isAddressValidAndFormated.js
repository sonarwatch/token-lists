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
    case "starknet":
      isValid = address.match(/^(0x)?[0-9a-fA-F]{64}$/) ? true : false;
      break;
    case "solana":
      isValid = isSolanaAddress(address);
      break;
    case "sei":
      isValid = address === address;
      break;
    default:
      isValid = false;
      break;
  }
  return isValid;
};
