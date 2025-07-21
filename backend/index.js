////The code below is to distingush between development and deployment environments, WITH "logger.js" incorportated;
// 📁 index.js — Main entry point for Property Care Backend

// 📁 index.js — Main entry point for Property Care Backend

// 📁 index.js — Main entry point for Property Care Backend

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const log = require("./utils/logger");
const requestLogger = require("./middleware/requestLogger");
const authenticate = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
require("./db");

// ✅ Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

// ✅ Dynamic CORS Configuration
const allowedOrigins = ENV === "development"
  ? ["http://localhost:5174"]
  : ["https://property-app-care-2-4113.vercel.app"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow Postman, curl, etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      log.warn(`🚫 Blocked CORS request from: ${origin}`);
      return callback(new Error(`❌ Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));

// ✅ Built-in Middleware
app.use(express.json());

// ✅ Custom Logger Middleware
app.use(requestLogger);

// ✅ Routes
const ocrRoutes = require("./routes/ocr");
const propertyRoutes = require("./routes/property");
const projectRoutes = require("./routes/project");

// Example: protected route using `authenticate` middleware
// app.use("/api/secure", authenticate, secureRoutes); // Uncomment when `secureRoutes` is defined

// ✅ Mount API Routes
app.use("/api/ocr", ocrRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/project", projectRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  log.info("🌡️  Health check called");
  res.send("✅ Property Care Backend is running.");
});

// ✅ Global Error Handling (should be last middleware)
app.use(errorHandler);

// ✅ Start Server
app.listen(PORT, () => {
  if (ENV === "development") {
    log.success(`🚀 Server running locally at: http://localhost:${PORT}`);
  } else {
    log.success(`🚀 Server running in production`);
    log.info(`🌐 Live at: https://property-app-care-2-4113.vercel.app`);
  }
});

//////////////////////////////////////////////////////////////////////////////////
// ////The code below is to distingush between development and deployment environments, WITHOUT "logger.js" incorportated;
// // 📁 index.js — Main entry point for Property Care Backend

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// // ✅ Load environment variables
// dotenv.config();

// // ✅ Connect to MongoDB
// require("./db");

// // ✅ Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5000;
// const ENV = process.env.NODE_ENV || "development";

// // ✅ Dynamic CORS Configuration
// const allowedOrigins = ENV === "development"
//   ? ["http://localhost:5174"] // Vite dev server
//   : ["https://property-app-care-2-4113.vercel.app"]; // Production frontend

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // Allow curl/Postman
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error(`❌ Not allowed by CORS: ${origin}`));
//     }
//   },
//   credentials: true
// }));

// // ✅ Middleware
// app.use(express.json());

// // ✅ Routes
// const ocrRoutes = require("./routes/ocr");
// const propertyRoutes = require("./routes/property");
// const projectRoutes = require("./routes/project");

// app.use("/api/ocr", ocrRoutes);
// app.use("/api/property", propertyRoutes);
// app.use("/api/project", projectRoutes);

// // ✅ Health Check
// app.get("/", (req, res) => {
//   res.send("✅ Property Care Backend is running.");
// });

// // ✅ Start Server with Environment Logging
// app.listen(PORT, () => {
//   if (ENV === "development") {
//     console.log(`🚀 Server running in development at: http://localhost:${PORT}`);
//   } else {
//     console.log(`🚀 Server running in ${ENV} mode`);
//     console.log(`🌐 Expected to be hosted at: https://property-app-care-2-4113.vercel.app`);
//   }
// });
////////////////////////////////////////////////////
