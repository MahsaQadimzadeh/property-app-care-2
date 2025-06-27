
// utils/openaiCategorizer.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // Make sure this is set in your .env file or environment
});

const categorizeInvoiceText = async (text) => {
  const prompt = `
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
  `;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const resultText = aiResponse.choices?.[0]?.message?.content || "{}";

  try {
    return JSON.parse(resultText);
  } catch (err) {
    throw new Error("Failed to parse AI response: " + resultText);
  }
};

module.exports = { categorizeInvoiceText };

////////////////////////////////////////////////////////
// const { OpenAI } = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_KEY, // Make sure OPENAI_KEY is in your .env file
// });

// const categorizeInvoiceText = async (text) => {
//   const res = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       {
//         role: "user",
//         content: `Categorize this invoice text into vendor, amount, date, and project type:\n\n"${text}"`,
//       },
//     ],
//   });

//   return res.choices[0].message?.content;
// };

// module.exports = { categorizeInvoiceText };
