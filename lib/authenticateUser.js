var md5 = require('md5'),
    User = require('./userModel'),
    loginUser = require('./loginUser');

// authenticates a user and logs them in

function authenticateUser(socket,data){

  // hash the password
  data.password = md5(data.password);

  User.findOne(data, null, function(err,data){

    // if args correct, log user in
    if(data){
    	return loginUser(socket, data);
    } else {
    	return socket.emit('user.login.error', err || {
    		message: 'Invalid email or password'
    	});
    }

  });

};


module.exports = authenticateUser;