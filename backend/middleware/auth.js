const log = require("../utils/logger");

const authenticate = (req, res, next) => {
  // Simulated auth check
  const user = req.user || { email: "anonymous@example.com" }; // Replace with real auth logic

  // If authenticated
  log.info(`🔐 Authenticated request from user ${user.email}`);
  next();
};

module.exports = authenticate;
