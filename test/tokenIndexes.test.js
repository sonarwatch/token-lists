const { expect } = require("chai");

const { assertNetworkId } = require("@sonarwatch/portfolio-core");
const tokenIndexesByNetworkId = require("../src/tokenIndexes");
const formatTokenAddress = require("../src/helpers/formatTokenAddress");

describe("tokenIndexes", () => {
  it(`is valid`, () => {
    for (const [networkIdStr, tokenIndexes] of Object.entries(
      tokenIndexesByNetworkId
    )) {
      const networkId = assertNetworkId(networkIdStr);
      for (const [indexAddress, indexedAddresses] of Object.entries(
        tokenIndexes
      )) {
        const fIndexAddress = formatTokenAddress(indexAddress, networkId);
        expect(fIndexAddress).to.equal(indexAddress);
        indexedAddresses.forEach((address) => {
          const fAddress = formatTokenAddress(address, networkId);
          expect(fAddress).to.equal(address);
        });
      }
    }
  });
});
