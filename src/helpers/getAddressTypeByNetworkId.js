const listStaticConfigs = require("../assets/listStaticConfigs.json");

module.exports = function getAddressTypeByNetworkId(networkId) {
  const addressType = listStaticConfigs[networkId]?.addressType;
  if (!addressType)
    throw new Error(`List static networkId is missing: ${networkId}`);
  return addressType;
};
