const aptosList = require("../build/sonarwatch.aptos.tokenlist.json");
const avalancheList = require("../build/sonarwatch.avalanche.tokenlist.json");
const bitcoinList = require("../build/sonarwatch.bitcoin.tokenlist.json");
const ethereumList = require("../build/sonarwatch.ethereum.tokenlist.json");
const optimismList = require("../build/sonarwatch.optimism.tokenlist.json");
const polygonList = require("../build/sonarwatch.polygon.tokenlist.json");
const solanaList = require("../build/sonarwatch.solana.tokenlist.json");
const suiList = require("../build/sonarwatch.sui.tokenlist.json");
const seiList = require("../build/sonarwatch.sei.tokenlist.json");

const lists = {
  aptos: aptosList,
  avalanche: avalancheList,
  bitcoin: bitcoinList,
  ethereum: ethereumList,
  optimism: optimismList,
  polygon: polygonList,
  solana: solanaList,
  sui: suiList,
  sei: seiList,
};
console.log(JSON.stringify(lists, null, 2));
