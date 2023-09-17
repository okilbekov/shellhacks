const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

usersRouter.get('/', async (request, response) => {
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, config.JWT_SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	
	const user = await User.findById(decodedToken.id)

	response.json(user);
});

usersRouter.post('/signup', async (request, response) => {
	const { email, password, username } = request.body;

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

		const userForToken = {
            id: savedUser.id,
            username: savedUser.username
        };

        const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: '1h' });

        response.json({ token, username: user.username, id: user._id });
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
});

module.exports = usersRouter;