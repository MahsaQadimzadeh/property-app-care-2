


//////Moified version 2 (OCR, property and project routs included):

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to MongoDB
require("./db");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup
const allowedOrigins = ["https://property-app-care-2-4113.vercel.app"]; // 🔁 Replace with real frontend URL
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
const ocrRoutes = require("./routes/ocr");
const propertyRoutes = require("./routes/property");
const projectRoutes = require("./routes/project");

app.use("/api/ocr", ocrRoutes);         // e.g., POST /api/ocr/upload
app.use("/api/property", propertyRoutes); // e.g., GET /api/property/all
app.use("/api/project", projectRoutes);   // e.g., GET /api/project/:id

// ✅ Root Health Check
app.get("/", (req, res) => {
  res.send("✅ Property Care Backend is running.");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// // //this is the modified version of "initial version" (with allowedOrigins and full structure):

// // 📁 index.js — Entry point for Property Care Backend API

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // Connect to MongoDB
// require('./db');

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ CORS Setup: Only allow your frontend origin
// const allowedOrigins = ['https://your-frontend.vercel.app']; // Replace with your real frontend URL

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// // Middleware
// app.use(express.json());

// // 📦 Route Imports
// const ocrRoutes = require('./routes/ocr');
// const propertyRoutes = require('./routes/property');

// // 📍 Route Mounting
// app.use('/api', ocrRoutes);       // e.g. POST /api/upload-and-process
// app.use('/api', propertyRoutes);  // e.g. GET /api/properties

// // ✅ Health Check
// app.get('/', (req, res) => {
//   res.send('✅ Property Care OCR API is running');
// });

// // 🚀 Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });



///this is the initial version :
// //Hooking the Property Route into Your App:
// //This means that any route defined in routes/property.js will be available under /api/....

// const propertyRoutes = require('./routes/property');  // Make sure the file name matches exactly
// app.use('/api', propertyRoutes);  // This mounts all routes under the /api path

// //////////////////////////////
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// require('./db');

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// const ocrRoutes = require('./routes/ocr');
// app.use('/api', ocrRoutes);  // POST /api/upload-and-process

// // Health check route
// app.get('/', (req, res) => {
//   res.send('✅ Property Care OCR API is running');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

