const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const user = await User.findOne({ email });
	console.log(user);
	if (!user || !(await user.checkPassword(password))) {
		return response.status(401).json({ error: 'Invalid email or password' });
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: '1h' });

	response.json({ token, username: user.username, id: user._id });
});

module.exports = loginRouter;