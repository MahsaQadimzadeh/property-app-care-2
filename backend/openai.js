const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.interpretInvoice = async (text) => {
  const prompt = `Extract the key fields (vendor, amount, date, project type) from this invoice:\n\n${text}`;
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return res.choices[0].message.content;
};