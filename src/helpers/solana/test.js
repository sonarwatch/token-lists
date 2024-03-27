const { default: axios } = require("axios");
const sharp = require("sharp");
const fs = require("fs");

const folder = "./images/solana/";
const pngFiles = [];
fs.readdirSync(folder).forEach((file) => {
  if (file.endsWith(".png")) pngFiles.push(file);
});

async function main() {
  for (let i = 0; i < 4800; i++) {
    const pngFile = pngFiles[i];
    if (!pngFile) return;
    await sharp(folder + pngFile)
      .resize(64, 64)
      .webp()
      .toFile(folder + pngFile.slice(0, -3) + "webp")
      .catch((e) => {
        console.error(pngFile);
      });
    fs.unlinkSync(folder + pngFile);
  }
}

main();
