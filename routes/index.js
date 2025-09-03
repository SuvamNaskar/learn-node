const express = require('express');
const router = express.Router();

// MongoDB Task model (you'll need to create this)
const Task = require('../models/Task');

// Home route
router.get('/', (req, res) => {
    res.render('home/index', { title: 'Home' });
});

// GET all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.render('tasks/index', { 
            title: 'Tasks', 
            tasks: tasks 
        });
    } catch (error) {
        res.render('error', { 
            title: 'Error', 
            message: 'Failed to load tasks' 
        });
    }
});

// GET form to create new task
router.get('/tasks/new', (req, res) => {
    res.render('tasks/new', { title: 'New Task' });
});

// POST create new task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.render('tasks/new', { 
                title: 'New Task', 
                error: 'Title is required' 
            });
        }
        
        const task = new Task({
            title,
            description: description || '',
            completed: false
        });
        
        await task.save();
        res.redirect('/tasks');
    } catch (error) {
        res.render('tasks/new', { 
            title: 'New Task', 
            error: 'Failed to create task' 
        });
    }
});

// GET single task
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.render('error', { 
                title: 'Error', 
                message: 'Task not found' 
            });
        }
        res.render('tasks/show', { 
            title: 'Task Details', 
            task: task 
        });
    } catch (error) {
        res.render('error', { 
            title: 'Error', 
            message: 'Task not found' 
        });
    }
});

// GET form to edit task
router.get('/tasks/:id/edit', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.render('error', { 
                title: 'Error', 
                message: 'Task not found' 
            });
        }
        res.render('tasks/edit', { 
            title: 'Edit Task', 
            task: task 
        });
    } catch (error) {
        res.render('error', { 
            title: 'Error', 
            message: 'Task not found' 
        });
    }
});

// PUT update task
router.put('/tasks/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const updateData = {
            title,
            description,
            completed: completed === 'on'
        };
        
        const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!task) {
            return res.render('error', { 
                title: 'Error', 
                message: 'Task not found' 
            });
        }
        res.redirect('/tasks/' + req.params.id);
    } catch (error) {
        res.render('error', { 
            title: 'Error', 
            message: 'Failed to update task' 
        });
    }
});

// DELETE task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.render('error', { 
                title: 'Error', 
                message: 'Task not found' 
            });
        }
        res.redirect('/tasks');
    } catch (error) {
        res.render('error', { 
            title: 'Error', 
            message: 'Failed to delete task' 
        });
    }
});

module.exports = router;