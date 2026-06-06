const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 75,
  useClones: false,
});

module.exports = cache;