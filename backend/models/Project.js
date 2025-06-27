const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  uid: String,
  email: String,
  title: String,
  description: String,
  cost: Number,
  invoiceUrl: String,
  imageUrls: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);