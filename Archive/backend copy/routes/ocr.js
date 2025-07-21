//With MongoDB Storage:

const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const Project = require('../models/Project');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const client = new vision.ImageAnnotatorClient();

router.post('/upload-and-process', upload.single('file'), async (req, res) => {
  try {
    const { uid, email } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const [result] = await client.textDetection(file.path);
    const rawText = result.textAnnotations[0]?.description || '';

    const project = new Project({
      uid,
      email,
      fileUrl: file.path,
      rawText,
      vendor: '',
      date: new Date(),
      total_amount: '',
      project_description: '',
      category: '',
    });

    await project.save();
    fs.unlinkSync(file.path);
    res.json({ message: 'File processed and saved', rawText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

module.exports = router;


////////////////////////////////
//////with Firebase Storage:
// const express = require('express');
// const router = express.Router();
// const { processFromFirebase } = require('../controllers/ocrController');

// router.post('/upload-and-process', processFromFirebase);

// module.exports = router;

//////////////////////////////

// const { detectTextFromImage } = require('../utils/visionOCR');

// const extractedText = await detectTextFromImage(fileUrl); // from Firebase public URL
////////////////////////


// const express = require("express");
// const router = express.Router();

// // POST /api/ocr/upload
// router.post("/upload", (req, res) => {
//   // Simulate OCR parsing logic
//   res.json({
//     message: "OCR processing complete",
//     data: {
//       project: "Roof Repair",
//       contractor: "ABC Roofing",
//       amount: "$5000",
//       date: "2024-05-10"
//     }
//   });
// });

// module.exports = router;
