
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  uid: String,
  email: String,
  fileUrl: String,
  rawText: String,
  vendor: String,
  date: Date,
  total_amount: String,
  project_description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);


//////////////////////////////////////////////
/// const express = require('express');
// const router = express.Router();
// //const Project = require('../backend/models/Project');
// const Project = require('../models/Project');

// // GET /api/projects
// router.get('/projects', async (req, res) => {
//   const { propertyId, contractor } = req.query;

//   const query = {
//     ...(propertyId && { propertyId }),
//     ...(contractor && { contractor }),
//   };

//   try {
//     const projects = await Project.find(query).populate('propertyId');
//     res.status(200).json(projects);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching projects' });
//   }
// });

// module.exports = router;

///////////////////////////////
/////////////////////
// const express = require("express");
// const router = express.Router();
// const Project = require("../models/Project");

// // GET /api/project
// router.get("/", async (req, res) => {
//   const projects = await Project.find().populate("propertyId");
//   res.json(projects);
// });

// // POST /api/project
// router.post("/", async (req, res) => {
//   const newProject = new Project(req.body);
//   await newProject.save();
//   res.status(201).json(newProject);
// });

// module.exports = router;
