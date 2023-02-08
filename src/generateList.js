const Ajv = require("ajv");
const { version } = require("../package.json");
const ajv = new Ajv({ allErrors: true, format: "full" });

module.exports = function generateList(listConfig) {
  const parsed = version.split(".");
  const list = {
    name: `SonarWatch ${listConfig.name} list`,
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: listConfig.logoURI,
    keywords: ["sonarwatch", listConfig.id],
    tokens: listConfig.tokens,
  };

  const validate = ajv.compile(listConfig.schema);
  const valid = validate(list);
  if (!valid) {
    console.error(validate.errors);
    throw new Error("List does not follow the scheme");
  }
  return list;
};
