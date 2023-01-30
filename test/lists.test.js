const packageJson = require("../package.json");
const { expect } = require("chai");
const lists = require("../build/sonarwatch.tokenlists.json");
const listConfigs = require("../src/assets/listStaticConfigs.json");
const isAddressValidAndFormated = require("../src/helpers/isAddressValidAndFormated");

describe("lists", () => {
  it(`contains lists`, () => {
    expect(Object.keys(lists).length).to.be.greaterThan(0);
  });

  Object.entries(lists).forEach(([networkId, list]) => {
    it(`[${networkId}] contains no duplicate addresses`, () => {
      const map = {};
      for (let token of list.tokens) {
        const key = `${token.chainId}-${token.address}`;
        expect(typeof map[key]).to.equal("undefined");
        map[key] = true;
      }
    });

    it(`[${networkId}] contains correct chainId`, () => {
      const config = listConfigs[networkId];
      for (let token of list.tokens) {
        expect(token.chainId).to.equal(config.chainId);
      }
    });

    it(`[${networkId}] all addresses are valid and correctly formated`, () => {
      const config = listConfigs[networkId];
      for (let token of list.tokens) {
        const isValid = isAddressValidAndFormated(
          token.address,
          config.addressType
        );
        expect(isValid).to.eq(true, token.address);
      }
    });

    it(`[${networkId}] version matches package.json`, () => {
      expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
      expect(packageJson.version).to.equal(
        `${list.version.major}.${list.version.minor}.${list.version.patch}`
      );
    });
  });
});
