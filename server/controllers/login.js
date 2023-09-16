const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const jwt = require('jsonwebtoken');

loginRouter.post('/login', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	if (!user || !(await user.checkPassword(password))) {
		return response.status(401).json({ error: 'Invalid username or password' });
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h' });

	response.json({ token, username: user.username, id: user._id });
});