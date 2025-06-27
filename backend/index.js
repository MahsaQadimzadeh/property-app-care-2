//Hooking the Property Route into Your App:
//This means that any route defined in routes/property.js will be available under /api/....

const propertyRoutes = require('./routes/property');  // Make sure the file name matches exactly
app.use('/api', propertyRoutes);  // This mounts all routes under the /api path

//////////////////////////////
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
require('./db');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ocrRoutes = require('./routes/ocr');
app.use('/api', ocrRoutes);  // POST /api/upload-and-process

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Property Care OCR API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

////////////////////////////
// const express = require('express');
// const cors = require('cors');
// const propertyRoutes = require('./routes/property');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Allow all origins
// app.use(express.json());

// // Mount your route
// app.use('/api', propertyRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

