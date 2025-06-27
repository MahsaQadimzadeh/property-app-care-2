const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  uid: String,
  email: String,
  fileUrl: String,
  rawText: String,
  vendor: String,
  date: String,
  total_amount: String,
  project_description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
