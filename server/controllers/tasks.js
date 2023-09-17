const tasksRouter = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const fs = require('fs');
const moment = require('moment');

const categorizeDeadline = (deadlineStr) => {
	if (!deadlineStr) return "noDeadline";
    const now = moment();
    const deadline = moment(deadlineStr, "YYYY/MM/DD HH:mm");
    const diffDays = deadline.diff(now, 'days');

    if (diffDays <= 0) return "due today";
    else if (diffDays <= 3) return "in 3 days";
    else if (diffDays <= 7) return "this week";
    return "this month";
}

const categorizeDuration = (durationMinutes) => {
    if (durationMinutes <= 30) return "Short Task";
    else if (durationMinutes <= 120) return "Medium Task";
    return "Long Task";
}

const computeScore = (task, attributes) => {
    let score = 0;

	const deadline = categorizeDeadline(task.deadline);
	const duration = categorizeDuration(task.duration);

    score += attributes.deadline[deadline] * attributes.deadline.weight;
    score += attributes.duration[duration] * attributes.estimatedDuration.weight;
    score += task.importance * attributes.importanceTag.weight;
    score += attributes.frequency[task.frequency] * attributes.frequency.weight;

    return score;
}

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

tasksRouter.get('/', async (request, response) => {
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, config.JWT_SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	try {
		const tasks = await Task.find({ user: user.id });
		response.json(tasks);
	} catch (error) {
		response.status(500).json({ error: 'Failed to fetch tasks' });
	}
});

tasksRouter.get('/sorted', async (request, response) => {
    const userId = request.user.id;

    try {
        const tasks = await Task.find({ user: userId });

        // Load the attributes and weights from attributes.json
        const attributes = JSON.parse(fs.readFileSync('attributes.json', 'utf8'));

        // Sort the tasks based on the computed score
        const sortedTasks = tasks.sort((a, b) => computeScore(b, attributes) - computeScore(a, attributes));

        response.json(sortedTasks);

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to retrieve sorted tasks' });
    }
});

tasksRouter.get('/:id', async (request, response) => {
	const taskId = request.params.id;
	const userId = request.user.id;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return response.status(404).json({ error: 'Task not found' });
		}

		// Check if the task belongs to the authenticated user
		if (task.user.toString() !== userId) {
			return response.status(403).json({ error: 'Access forbidden' });
		}

		response.json(task);

	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'Failed to retrieve task' });
	}
});

tasksRouter.post('/', async (request, response) => {
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, config.JWT_SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	// Validate the required fields
	if (!body.title || !body.deadline || !body.duration || !body.importance) {
		return response.status(400).json({ error: 'Required field missing' });
	}

	// Validate the importance value
	if (![1, 2, 3].includes(body.importance)) {
		return response.status(400).json({ error: 'Importance must be 1, 2, or 3' });
	}

	// Create the task
	const task = new Task({
		title: body.title,
		deadline: body.deadline,
		duration: body.duration,
		importance: body.importance,
		priorityScore: computeScore(body),
		reorderedPriorityScore: body.reorderedPriorityScore || null,
		completed: body.completed || false,
		user: userId
	});

	try {
		const savedTask = await task.save();
		response.json(savedTask);
	} catch (error) {
		// Handle errors during save operation, e.g. database errors
		response.status(500).json({ error: 'Failed to save task' });
	}
});

tasksRouter.delete('/:id', async (request, response) => {
	const taskId = request.params.id;
	const userId = request.user.id;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return response.status(404).json({ error: 'Task not found' });
		}

		// Check if the task belongs to the authenticated user
		if (task.user.toString() !== userId) {
			return response.status(403).json({ error: 'Access forbidden' });
		}

		await task.remove();

		response.status(204).end();

	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'Failed to delete task' });
	}
});

tasksRouter.patch('/:id', async (request, response) => {
	const taskId = request.params.id;
	const updates = request.body;
	const userId = request.user.id;

	// Validate the importance field if it's being updated
	if (updates.importance && ![1, 2, 3].includes(updates.importance)) {
		return response.status(400).json({ error: 'Importance must be 1, 2, or 3' });
	}

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return response.status(404).json({ error: 'Task not found' });
		}

		// Check if the task belongs to the authenticated user
		if (task.user.toString() !== userId) {
			return response.status(403).json({ error: 'Access forbidden' });
		}

		Object.assign(task, updates);
		const updatedTask = await task.save();

		response.json(updatedTask);

	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'Failed to update task' });
	}
});


module.exports = tasksRouter;