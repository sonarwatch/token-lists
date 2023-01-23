const packageJson = require("../package.json");
const { expect } = require("chai");
const { getAddress } = require("@ethersproject/address");
const Ajv = require("ajv");
const lists = require("../src/lists");
const listConfigs = require("../src/listConfigs");

const ajv = new Ajv({ allErrors: true, format: "full" });

describe("lists", () => {
  Object.entries(lists).forEach(([networkId, list]) => {
    it(`[${networkId}] contains no duplicate addresses`, () => {
      const map = {};
      for (let token of list.tokens) {
        const key = `${token.chainId}-${token.address}`;
        expect(typeof map[key]).to.equal("undefined");
        map[key] = true;
      }
    });

    it(`[${networkId}] contains no duplicate names`, () => {
      const map = {};
      for (let token of list.tokens) {
        const key = `${token.chainId}-${token.name.toLowerCase()}`;
        expect(typeof map[key]).to.equal(
          "undefined",
          `duplicate name: ${token.name}`
        );
        map[key] = true;
      }
    });

    it(`[${networkId}] contains correct chainId`, () => {
      const config = listConfigs.find((lConfig) => lConfig.id === networkId);
      for (let token of list.tokens) {
        expect(token.chainId).to.equal(config.chainId);
      }
    });

    it(`[${networkId}] all addresses are valid and checksummed`, () => {
      const config = listConfigs.find((lConfig) => lConfig.id === networkId);
      for (let token of list.tokens) {
        switch (config.addressType) {
          case "evm":
            expect(getAddress(token.address)).to.eq(token.address);
            break;
          case "aptos":
            expect(token.address).to.eq(token.address);
            break;
          default:
            expect(getAddress(token.address)).to.eq(token.address);
            break;
        }
      }
    });

    it(`[${networkId}] version matches package.json`, () => {
      expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
      expect(packageJson.version).to.equal(
        `${list.version.major}.${list.version.minor}.${list.version.patch}`
      );
    });

    it(`[${networkId}] validates schema`, () => {
      const config = listConfigs.find((lConfig) => lConfig.id === networkId);
      const validator = ajv.compile(config.schema);
      expect(validator(list)).to.equal(true);
    });
  });
});
