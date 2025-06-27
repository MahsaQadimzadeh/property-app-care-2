const express = require('express');
const router = express.Router();
const Property = require('../backend/models/Property');

router.get('/properties', async (req, res) => {
  const { forSale, location } = req.query;

  const query = {
    ...(forSale && { forSale: forSale === 'true' }),
    ...(location && { location }),
  };

  try {
    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching properties' });
  }
});

module.exports = router;
