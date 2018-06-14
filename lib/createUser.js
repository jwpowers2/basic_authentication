var md5 = require('md5'),
    User = require('./userModel'),
    loginUser = require('./loginUser');

// creates a new user

function createUser(socket,data){

  // hash the password
  data.password = md5(data.password);

  // create a new user in MongoDB
  var user = new User(data);

  // save the MongoDB Model
  user.save().then(function (data){
  	return loginUser(socket, data);
  });

};

module.exports = createUser;