const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', (request, response) => {
	Task.find({}).then(tasks => {
		response.json(tasks);
	});
});

tasksRouter.post('/', (request, response) => {
	const body = request.body;

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' });
	}

	const task = new Task({
		content: body.content,
		importance: body.importance,
	});

	task.save().then(savedTask => {
		response.json(savedTask);
	});
});

tasksRouter.delete('/:id', (request, response, next) => {
	Task.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end();
		})
		.catch(error => next(error));
});

tasksRouter.put('/:id', (request, response, next) => {
	const id = request.params.id;
	const body = request.body;
	// find by id and mark it as completed
	Task.findByIdAndUpdate(id, { completed: true }, { new: true })
		.then(updatedTask => {
			response.json(updatedTask);
		})
		.catch(error => next(error));
});

module.exports = tasksRouter;