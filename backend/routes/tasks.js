// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks - list all tasks
router.get('/', taskController.getTasks);

// POST /api/tasks - create a new task
router.post('/', taskController.createTask);

// PUT /api/tasks/:id - update an existing task (mark complete or edit name)
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;