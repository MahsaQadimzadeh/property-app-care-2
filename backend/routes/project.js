
///WITH incorporating "logger.js" in it!
// 📁 routes/project.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const log = require("../utils/logger");

// @route   POST /api/project
// @desc    Create a new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    log.success(`🛠️ Project created for user ${project.email}`);
    res.status(201).json(project);
  } catch (err) {
    log.error(`❌ Failed to create project: ${err.message}`);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/project
// @desc    Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    log.info(`📦 Returned ${projects.length} projects`);
    res.json(projects);
  } catch (err) {
    log.error(`❌ Failed to get projects: ${err.message}`);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

//////////////////////////////////////////////////////////////
///WITHOUT incorporating "logger.js" in it!
// const mongoose = require('mongoose');

// const ProjectSchema = new mongoose.Schema({
//   uid: String,
//   email: String,
//   fileUrl: String,
//   rawText: String,
//   vendor: String,
//   date: Date,
//   total_amount: String,
//   project_description: String,
//   category: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Project', ProjectSchema);


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
