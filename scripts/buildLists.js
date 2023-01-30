const ethereumList = require("../build/sonarwatch.ethereum.tokenlist.json");
const aptosList = require("../build/sonarwatch.aptos.tokenlist.json");
const avalancheList = require("../build/sonarwatch.avalanche.tokenlist.json");
const polygonList = require("../build/sonarwatch.polygon.tokenlist.json");
const solanaList = require("../build/sonarwatch.solana.tokenlist.json");

const lists = {
  ethereum: ethereumList,
  aptos: aptosList,
  avalanche: avalancheList,
  polygon: polygonList,
  solana: solanaList,
};
console.log(JSON.stringify(lists, null, 2));
