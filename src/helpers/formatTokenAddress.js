const { getAddress } = require("@ethersproject/address");
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
  return getAddress(address.toLocaleLowerCase());
}

function formatTokenAddressMove(address) {
  assertMoveTokenAddress(address);
  let tAddress = address;
  if (!address.startsWith("0x")) tAddress = `0x${tAddress}`;
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
