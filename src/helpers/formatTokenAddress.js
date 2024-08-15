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
  if (!address.startsWith("0x")) tAddress = `0x${tAddress}`;
  if (!isHexString(tAddress, 32)) {
    tAddress = `${tAddress.slice(0, 2)}0${tAddress.slice(2)}`;
  }
  return tAddress;
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
