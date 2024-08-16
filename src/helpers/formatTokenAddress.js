const { getAddress } = require("@ethersproject/address");
const { isHexString } = require("@ethersproject/bytes");
const getAddressTypeByNetworkId = require("./getAddressTypeByNetworkId");
const {
  assertSolanaTokenAddress,
  assertEvmTokenAddress,
  assertMoveTokenAddress,
  assertSeiTokenAddress,
  assertBitcoinTokenAddress,
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
  let tAddress = address;

  const splitted = address.split("::");
  let mainAddress = splitted.at(0).toLowerCase();

  if (!mainAddress.startsWith("0x")) mainAddress = `0x${tAddress}`;
  if (
    !isHexString(mainAddress, 32) &&
    mainAddress !== "0x1::aptos_coin::AptosCoin"
  ) {
    mainAddress = `${mainAddress.slice(0, 2)}0${mainAddress.slice(2)}`;
  }
  splitted[0] = mainAddress;
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
