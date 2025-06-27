const express = require('express');
const router = express.Router();

router.get('/by-property/:propertyId', (req, res) => {
  res.send([]); // mock
});

module.exports = router;