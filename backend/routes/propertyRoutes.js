const express = require('express');
const router = express.Router();

router.get('/:uid', (req, res) => {
  res.send([]); // mock
});

module.exports = router;