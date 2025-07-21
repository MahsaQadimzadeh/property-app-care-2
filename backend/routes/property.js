const express = require('express');
const router = express.Router();
//const Property = require('../backend/models/Property');
const Property = require('../models/Property');

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

////////////////


// const express = require("express");
// const router = express.Router();
// const Property = require("../models/Property");

// // GET /api/property
// router.get("/", async (req, res) => {
//   const properties = await Property.find();
//   res.json(properties);
// });

// // POST /api/property
// router.post("/", async (req, res) => {
//   const newProperty = new Property(req.body);
//   await newProperty.save();
//   res.status(201).json(newProperty);
// });

// module.exports = router;


