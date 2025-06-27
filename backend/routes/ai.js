const express = require('express');
const { categorizeInvoice } = require('../controllers/aiController');
const router = express.Router();

router.post('/categorize', categorizeInvoice);

module.exports = router;
