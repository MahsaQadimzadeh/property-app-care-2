const express = require('express');
const cors = require('cors');
require('dotenv').config();

const uploadRoutes = require('./routes/uploadRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/project', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));