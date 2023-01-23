const generateList = require("./generateList");
const listConfigs = require("./listConfigs");

const lists = listConfigs.reduce(
  (lists, listConfig) => (
    (lists[listConfig.id] = generateList(listConfig)), lists
  ),
  {}
);
module.exports = lists;
