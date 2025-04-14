// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Task description/title (required)
  completed: { type: Boolean, default: false }   // Completion status, default false
}, { timestamps: true });  // automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Task', TaskSchema);