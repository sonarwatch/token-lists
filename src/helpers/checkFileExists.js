const fs = require("fs").promises;

module.exports = async function checkFileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
};
