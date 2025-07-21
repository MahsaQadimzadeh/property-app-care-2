const mongoose = require('mongoose');
const Project = require('../models/Project');
const { detectTextFromImage } = require('../utils/visionOCR'); // wrapper around Google Vision API
const { categorizeInvoiceText } = require('../utils/openaiCategorizer'); // wrapper around OpenAI

exports.processFromFirebase = async (req, res) => {
  const { fileUrl, uid, email } = req.body;
  if (!fileUrl || !uid) {
    return res.status(400).json({ message: 'Missing file URL or user ID' });
  }

  try {
    // ✅ Step 1: Use Google Vision OCR
    const extractedText = await detectTextFromImage(fileUrl);

    // ✅ Step 2: Use OpenAI to structure the invoice content
    const structuredData = await categorizeInvoiceText(extractedText);

    // ✅ Step 3: Save result to MongoDB
    const projectEntry = await Project.create({
      uid,
      email,
      fileUrl,
      rawText: extractedText,
      ...structuredData,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Processed and saved', project: projectEntry });
  } catch (error) {
    console.error('OCR/AI error:', error);
    res.status(500).json({ message: 'Failed to process file', error });
  }
};

///////////////////////////////////////////
// // controllers/ocrController.js

// const mongoose = require('mongoose');
// const Project = require('../models/Project'); // Mongoose model
// const { detectTextFromImage } = require('../utils/visionOCR');
// const { categorizeInvoiceText } = require('../utils/openaiCategorizer');

// exports.processFromFirebase = async (req, res) => {
//   const { fileUrl, uid, email } = req.body;
//   if (!fileUrl || !uid) return res.status(400).json({ message: 'Missing file URL or user ID' });

//   try {
//     // ✅ Step 1: Extract text from image
//     const extractedText = await detectTextFromImage(fileUrl);

//     // ✅ Step 2: Categorize using OpenAI
//     const structuredData = await categorizeInvoiceText(extractedText);

//     // ✅ Step 3: Save to MongoDB
//     const projectEntry = await Project.create({
//       uid,
//       email,
//       fileUrl,
//       rawText: extractedText,
//       ...structuredData,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ message: 'Processed and saved', project: projectEntry });
//   } catch (error) {
//     console.error('OCR/AI error:', error);
//     res.status(500).json({ message: 'Failed to process file', error });
//   }
// };


// ////////////////////////////////////////
// // const vision = require('@google-cloud/vision');
// // const { OpenAI } = require("openai");
// // const mongoose = require('mongoose');
// // const Project = require('../models/Project'); // Mongoose model

// // const client = new vision.ImageAnnotatorClient();
// // const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// // exports.processFromFirebase = async (req, res) => {
// //   const { fileUrl, uid, email } = req.body;
// //   if (!fileUrl || !uid) return res.status(400).json({ message: 'Missing file URL or user ID' });

// //   try {
// //     // 1. Google Vision OCR
// //     const [result] = await client.textDetection(fileUrl);
// //     const text = result.textAnnotations?.[0]?.description || '';

// //     // 2. OpenAI for structuring
// //     const aiResponse = await openai.chat.completions.create({
// //       model: 'gpt-4',
// //       messages: [
// //         {
// //           role: 'user',
// //           content: `
// // This is a contractor invoice text:
// // "${text}"

// // Return structured JSON like:
// // {
// //   "vendor": "...",
// //   "date": "...",
// //   "total_amount": "...",
// //   "project_description": "...",
// //   "category": "plumbing | electrical | etc."
// // }
// //           `,
// //         },
// //       ],
// //     });

// //     const structured = JSON.parse(aiResponse.choices[0].message.content);

// //     // 3. Save to MongoDB
// //     const projectEntry = await Project.create({
// //       uid,
// //       email,
// //       fileUrl,
// //       rawText: text,
// //       ...structured,
// //       createdAt: new Date(),
// //     });

// //     res.status(200).json({ message: 'Processed and saved', project: projectEntry });
// //   } catch (error) {
// //     console.error('OCR/AI error:', error);
// //     res.status(500).json({ message: 'Failed to process file', error });
// //   }
// // };


// // //////
// // // const { detectTextFromImage } = require('../utils/visionOCR');

// // // const extractedText = await detectTextFromImage(fileUrl); // from Firebase public URL
