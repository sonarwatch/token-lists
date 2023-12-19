module.exports = async function getAptosDecimals(address, client) {
  const viewRes = await client.view({
    function: "0x1::coin::decimals",
    type_arguments: [address],
    arguments: [],
  });
  if (viewRes.length !== 1) return null;
  return viewRes[0];
};
