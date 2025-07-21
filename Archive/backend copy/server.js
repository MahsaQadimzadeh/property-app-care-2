
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ocrRoutes = require('./routes/ocr');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/ocr', ocrRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));


