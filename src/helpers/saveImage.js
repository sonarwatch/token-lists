const { default: axios } = require("axios");
const sharp = require("sharp");

module.exports = async function saveImage(url, fileOut) {
  const response = await axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .catch((e) => null);
  if (!response || !response.data) return false;
  try {
    await sharp(response.data).resize(64, 64).webp().toFile(fileOut);
    return true;
  } catch (error) {
    return false;
  }
};
