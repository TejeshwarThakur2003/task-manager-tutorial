// backend/controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    res.json(tasks);  // send the array of tasks as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Task name is required' });
    }
    const newTask = await Task.create({ name, completed: !!completed });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task (e.g., mark as completed or update name)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, completed },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};