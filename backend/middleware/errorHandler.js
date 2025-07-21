const log = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  log.error(`Global error: ${err.stack}`);
  res.status(500).json({ error: "Something went wrong!" });
};

module.exports = errorHandler;
