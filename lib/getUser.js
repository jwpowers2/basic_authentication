// get a user who matches the token

function getUser(socket,token){

  // emit error if token does not work
  if (!userSessions[token]){

    return socket.emit('user.get.error', {
    	message: 'This user is not authenticated'
    });

  }
  // emit a message with the profile and the token
  // if the token does exist
  return socket.emit('user.get.success', {
  	profile: userSessions[token],
  	token: token
  });

};

module.exports = getUser;