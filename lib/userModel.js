var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basicauthapp');

module.exports = mongoose.model('User', new mongoose.Schema({
	firstname: String,
	lastname: String,
	password: {type:String, select:false},
	email:String
}));

/*
module.exports = db.model('User', userSchema);



mongoose.model('User', new mongoose.Schema({

  name:{type: String},
  

},{timestamps:true,collection:'segment'}));
*/