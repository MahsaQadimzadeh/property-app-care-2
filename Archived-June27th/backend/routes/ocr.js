const express = require('express');
const router = express.Router();
const { processFromFirebase } = require('../controllers/ocrController');

router.post('/upload-and-process', processFromFirebase);

module.exports = router;



// const { detectTextFromImage } = require('../utils/visionOCR');

// const extractedText = await detectTextFromImage(fileUrl); // from Firebase public URL
