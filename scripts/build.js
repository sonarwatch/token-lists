const lists = require("../src");
const networkId = process.argv[2];
const list = lists[networkId];
if (!list) throw new Error(`List is missing: ${networkId}`);
console.log(JSON.stringify(list, null, 2));
