const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: String,
  ownerId: String,
  location: String,
  forSale: Boolean,
  images: [String],
  projects: [String], // or use ObjectId if referencing project documents
});

module.exports = mongoose.model('Property', propertySchema);



