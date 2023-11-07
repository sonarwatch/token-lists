const { default: axios } = require("axios");
const sleep = require("./sleep");

module.exports = async function getCoingeckoCoinsList() {
  try {
    const coinsListRes = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        params: {
          include_platform: "true",
        },
      }
    );
    await sleep(90000);
    return coinsListRes.data;
  } catch (error) {
    await sleep(90000);
    if (error.response) {
      throw new Error(
        `Failed to fetch Coingecko's coins list (${error.response.status})`
      );
    } else {
      throw error;
    }
  }
};
