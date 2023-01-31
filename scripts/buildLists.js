const aptosList = require("../build/sonarwatch.aptos.tokenlist.json");
const avalancheList = require("../build/sonarwatch.avalanche.tokenlist.json");
const ethereumList = require("../build/sonarwatch.ethereum.tokenlist.json");
const optimismList = require("../build/sonarwatch.optimism.tokenlist.json");
const polygonList = require("../build/sonarwatch.polygon.tokenlist.json");
const solanaList = require("../build/sonarwatch.solana.tokenlist.json");

const lists = {
  aptos: aptosList,
  avalanche: avalancheList,
  ethereum: ethereumList,
  optimism: optimismList,
  polygon: polygonList,
  solana: solanaList,
};
console.log(JSON.stringify(lists, null, 2));
