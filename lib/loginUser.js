var crypto = require('crypto'),
    getUser = require('./getUser');

// Logs in a user
function loginUser (socket, user) {

	// create a token with crypto
	var token = crypto.randomBytes(64).toString('base64');

	// save the user session
	userSessions[token] = user;

	// get the user belonging to the token and emit it
	return getUser(socket, token);
};

module.exports = loginUser;