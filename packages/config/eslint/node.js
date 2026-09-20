const base = require("./base");

module.exports = {
  ...base,
  env: {
    ...base.env,
    node: true,
  },
};
