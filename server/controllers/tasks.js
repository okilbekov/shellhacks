const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', async (request, response) => {
	const userId = request.user.id;

	try {
		const tasks = await Task.find({ user: userId });
		response.json(tasks);
	} catch (error) {
		response.status(500).json({ error: 'Failed to fetch tasks' });
	}
});

tasksRouter.get('/sorted', async (request, response) => {
	const userId = request.user.id;

	try {
		const tasks = await Task.find({ user: userId });

		const sortedTasks = tasks.sort((a, b) => b.priorityScore - a.priorityScore);

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
	const body = request.body;

	const userId = request.user.id;

	// Validate the required fields
	if (!body.title || !body.deadline || !body.duration || !body.importance || !body.priorityScore) {
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
		priorityScore: body.priorityScore,
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