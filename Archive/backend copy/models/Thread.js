// models/Thread.js


//A “Community” tab under each property
//Threads/comments under each project
//Option to add new posts with timestamps


// {
//   projectId: ObjectId,
//   author: String,
//   message: String,
//   timestamp: Date
// }
//////////////////////
const mongoose = require('mongoose');
const threadSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  author: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Thread', threadSchema);
