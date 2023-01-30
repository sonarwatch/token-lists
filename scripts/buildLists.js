const aptosList = require("../build/sonarwatch.aptos.tokenlist.json");
const avalancheList = require("../build/sonarwatch.avalanche.tokenlist.json");
const polygonList = require("../build/sonarwatch.polygon.tokenlist.json");

const lists = {
  aptos: aptosList,
  avalanche: avalancheList,
  polygon: polygonList,
};
console.log(JSON.stringify(lists, null, 2));
