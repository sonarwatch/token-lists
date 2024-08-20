const { getAddress } = require("@ethersproject/address");
const { isHexString } = require("@ethersproject/bytes");
const getAddressTypeByNetworkId = require("./getAddressTypeByNetworkId");
const {
  assertSolanaTokenAddress,
  assertEvmTokenAddress,
  assertMoveTokenAddress,
  assertSeiTokenAddress,
  assertBitcoinTokenAddress,
  formatMoveAddress,
} = require("@sonarwatch/portfolio-core");

function formatTokenAddressBitcoin(address) {
  assertBitcoinTokenAddress(address);
  return address;
}

function formatTokenAddressSolana(address) {
  assertSolanaTokenAddress(address);
  return address;
}

function formatTokenAddressEvm(address) {
  assertEvmTokenAddress(address);
  return getAddress(address.toLowerCase());
}

function formatTokenAddressMove(address) {
  assertMoveTokenAddress(address);
  if (address === "0x2::sui::SUI")
    return "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI";
  if (address === "0x1::aptos_coin::AptosCoin") return address;

  const splitted = address.split("::");
  splitted[0] = formatMoveAddress(splitted[0]);
  return splitted.join("::");
}

function formatTokenAddressSei(address) {
  assertSeiTokenAddress(address);
  return address;
}

const formaters = {
  move: formatTokenAddressMove,
  evm: formatTokenAddressEvm,
  solana: formatTokenAddressSolana,
  bitcoin: formatTokenAddressBitcoin,
  sei: formatTokenAddressSei,
};

module.exports = function formatTokenAddress(address, networkId) {
  const addressType = getAddressTypeByNetworkId(networkId);
  const formater = formaters[addressType];
  if (!formaters)
    throw new Error(`Token Address formater is missing: ${addressType}`);
  return formater(address);
};
