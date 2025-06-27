const express = require('express');
const { parseImage } = require('../vision');
const { interpretInvoice } = require('../openai');
const router = express.Router();

router.post('/', async (req, res) => {
  const { fileUrl } = req.body;
  const rawText = await parseImage(fileUrl);
  const aiResult = await interpretInvoice(rawText);
  res.json({ rawText, aiResult });
});

module.exports = router;