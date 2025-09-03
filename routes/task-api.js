const express = require('express');
const router = express.Router();

let tasks = [];
let nextId = 1;

// GET all tasks (API)
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET single task by ID (API)
router.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

// POST create new task (API)
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = { id: nextId++, title, description: description || '', completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// PUT update task (API)
router.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// DELETE task (API)
router.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.status(204).send();
});

module.exports = router;