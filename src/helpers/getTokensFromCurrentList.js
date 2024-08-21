const { default: axios } = require("axios");

module.exports = async function getTokensFromCurrentList(networkId) {
  let currentList = await axios
    .get(
      `https://github.com/sonarwatch/token-lists/releases/latest/download/sonarwatch.${networkId}.tokenlist.json`,
      { timeout: 120000 }
    )
    .catch((e) => {
      throw new Error("Failed to fetch current list", { cause: e });
    });

  if (!currentList.data || !currentList.data.tokens)
    throw new Error("Failed to fetch current list data");

  return currentList.data.tokens;
};
