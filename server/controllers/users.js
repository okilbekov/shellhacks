const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('./models/User');

usersRouter.post('/register', async (request, response) => {
	const { username, email, password } = request.body;

	if (!password || password.length < 8) {
		return response.status(400).json({ error: 'Password should be at least 8 characters long.' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		email,
		passwordHash
	});

	try {
		const savedUser = await user.save();
		response.json(savedUser);
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
});