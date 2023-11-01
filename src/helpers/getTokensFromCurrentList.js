const { default: axios } = require("axios");

module.exports = async function getTokensFromCurrentList(networkId) {
  const currentList = await axios
    .get(
      `https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.${networkId}.tokenlist.json`
    )
    .catch(() => null);
  if (!currentList || !currentList.data || !currentList.data.tokens)
    throw new Error("Failed to fetch current list");

  return currentList.data.tokens;
};
