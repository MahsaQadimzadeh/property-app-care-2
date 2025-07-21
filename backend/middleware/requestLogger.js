// 📁 middleware/requestLogger.js

const log = require("../utils/logger");

const requestLogger = (req, res, next) => {
  log.info(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
