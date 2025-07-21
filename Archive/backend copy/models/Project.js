const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  uid: { type: String, required: true },                     // User ID
  email: { type: String, required: true },                   // User email
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  
  name: { type: String, required: true },                    // Project name/title
  contractor: { type: String, default: "" },                 // Contractor name
  cost: { type: Number, default: 0 },                        // Total cost
  
  date: { type: Date },                                      // Project date
  category: { type: String, default: "" },                   // e.g. plumbing, roofing
  description: { type: String, default: "" },                // Description of work

  fileUrl: { type: String },                                 // Uploaded invoice URL
  invoiceUrl: { type: String },                              // Alternate invoice link
  rawText: { type: String },                                 // OCR-extracted raw text
  vendor: { type: String, default: "" },                     // Vendor from OCR

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);





// const mongoose = require('mongoose');

// const ProjectSchema = new mongoose.Schema({
//   uid: String,
//   email: String,
//   fileUrl: String,
//   rawText: String,
//   vendor: String,
//   date: String,
//   total_amount: String,
//   project_description: String,
//   category: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Project', ProjectSchema);
// //////////////
// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//   propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
//   name: { type: String, required: true },
//   contractor: String,
//   cost: Number,
//   description: String,
//   date: Date,
//   invoiceUrl: String
// });

// module.exports = mongoose.model("Project", projectSchema);
