const packageJson = require("../package.json");
const { expect } = require("chai");
const lists = require("../build/sonarwatch.tokenlists.json");
const listConfigs = require("../src/assets/listStaticConfigs.json");
const formatTokenAddress = require("../src/helpers/formatTokenAddress");

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
    }).timeout(25000);

    it(`[${networkId}] contains correct chainId`, () => {
      const config = listConfigs[networkId];
      for (let token of list.tokens) {
        expect(token.chainId).to.equal(config.chainId);
      }
    });

    it(`[${networkId}] all addresses are valid and correctly formated`, () => {
      const config = listConfigs[networkId];
      for (let token of list.tokens) {
        const fAddress = formatTokenAddress(token.address, networkId);
        expect(token.address).to.equal(fAddress);
      }
    }).timeout(10000);

    it(`[${networkId}] version matches package.json`, () => {
      expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
      expect(packageJson.version).to.equal(
        `${list.version.major}.${list.version.minor}.${list.version.patch}`
      );
    });
  });
});
