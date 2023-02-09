const { Contract } = require("@ethersproject/contracts");
const erc20Abi = require("./erc20Abi");

module.exports = async function getErc20Decimals(address, provider) {
  const code = await provider.getCode(address);
  if (code === "0x") return null;
  const contract = new Contract(address, erc20Abi, provider);
  const decimals = await contract.decimals().catch(() => {
    return null;
  });
  return decimals;
};
