// backend/controllers/aiController.js (or wherever your endpoint is defined)

const { OpenAI } = require("openai");
const mongoose = require("mongoose");
const Project = require("../models/Project"); // Mongoose model
const { handleOCR } = require("../services/visionOCR"); // Import your separated OCR logic

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

exports.processFromFirebase = async (req, res) => {
  const { fileUrl, uid, email } = req.body;
  if (!fileUrl || !uid) return res.status(400).json({ message: "Missing file URL or user ID" });

  try {
    // 🔍 1. Use Google Vision OCR via external module
    const text = await handleOCR(fileUrl);

    // 💡 2. Use OpenAI for text interpretation
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `
This is a contractor invoice text:
"${text}"

Return structured JSON like:
{
  "vendor": "...",
  "date": "...",
  "total_amount": "...",
  "project_description": "...",
  "category": "plumbing | electrical | etc."
}
          `,
        },
      ],
    });

    const structured = JSON.parse(aiResponse.choices[0].message.content);

    // 🧾 3. Save result to MongoDB
    const projectEntry = await Project.create({
      uid,
      email,
      fileUrl,
      rawText: text,
      ...structured,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Processed and saved", project: projectEntry });
  } catch (error) {
    console.error("OCR/AI error:", error);
    res.status(500).json({ message: "Failed to process file", error });
  }
};



///////////////////////////////////
// const { OpenAI } = require("openai");
// require('dotenv').config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// exports.categorizeInvoice = async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: 'No text provided' });

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "user",
//           content: `
// Here's some raw text extracted from a contractor invoice:
// "${text}"

// Return a structured JSON like:
// {
//   "vendor": "...",
//   "date": "...",
//   "total_amount": "...",
//   "project_description": "...",
//   "category": "plumbing | electrical | renovation | etc."
// }
//           `,
//         },
//       ],
//     });

//     const result = response.choices[0].message.content;
//     res.status(200).json({ structured: result });
//   } catch (error) {
//     console.error("OpenAI error:", error);
//     res.status(500).json({ error: 'Failed to analyze text with OpenAI' });
//   }
// };
