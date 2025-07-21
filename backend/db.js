
///the version below is environmental aware!:(here we use one DB for both Production and development, however you can use different DBs later and moify teh codes accordingly!)
// 📁 db.js — MongoDB connection setup

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const log = require("./utils/logger"); // ✅ Custom logger

// ✅ Load environment variables
dotenv.config();

const ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  log.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

// ✅ Enable debug mode for development
if (ENV === "development") {
  mongoose.set("debug", true);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.success(`✅ MongoDB connected successfully (${ENV} mode)`);
  } catch (err) {
    log.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

////////////////////////////
// // 📁 db.js — MongoDB connection setup
// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB Atlas");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1); // Force exit if connection fails
//   }
// };

// connectDB();
//////////////////

