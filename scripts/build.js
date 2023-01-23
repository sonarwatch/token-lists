const lists = require("../src");
const networkId = process.argv[2];

let objectToBuild =
  networkId === "all" ? Object.values(lists) : lists[networkId];
if (!objectToBuild) throw new Error(`List is missing: ${networkId}`);

console.log(JSON.stringify(objectToBuild, null, 2));
