const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  ownerId: { type: String, required: true },           // Reference to user
  location: { type: String, default: "" },             // e.g. "New York, NY"
  forSale: { type: Boolean, default: false },
  images: [{ type: String }],                          // Array of image URLs
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // Project references
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Property", propertySchema);

