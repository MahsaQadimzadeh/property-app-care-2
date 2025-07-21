///WITH Winston powered Log files!
// 📁 utils/logger.js
const { createLogger, format, transports } = require("winston");

const ENV = process.env.NODE_ENV || "development";

const logger = createLogger({
  level: ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = {
  info: (msg) => logger.info(msg),
  success: (msg) => logger.info(`✅ ${msg}`),
  warn: (msg) => logger.warn(`⚠️ ${msg}`),
  error: (msg) => logger.error(msg),
};

///////////////////////////////////////////////////////////////
///WITHOUT Winston powered Log files!
// const chalk = require("chalk");

// const ENV = process.env.NODE_ENV || "development";

// const log = {
//   info: (msg) => {
//     if (ENV === "development") {
//       console.log(chalk.blueBright(`ℹ️  [INFO] ${msg}`));
//     } else {
//       console.log(`[INFO] ${msg}`);
//     }
//   },

//   success: (msg) => {
//     const label = ENV === "development" ? chalk.greenBright(`✅ [SUCCESS]`) : `[SUCCESS]`;
//     console.log(`${label} ${msg}`);
//   },

//   warn: (msg) => {
//     const label = ENV === "development" ? chalk.yellowBright(`⚠️  [WARNING]`) : `[WARNING]`;
//     console.warn(`${label} ${msg}`);
//   },

//   error: (msg) => {
//     const label = ENV === "development" ? chalk.redBright(`❌ [ERROR]`) : `[ERROR]`;
//     console.error(`${label} ${msg}`);
//   },
// };

// module.exports = log;
//////////////////////
