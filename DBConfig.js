var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var user = new Schema({
	name : {
		type: String,
		require: true
	},
	address : {
		type: String,
		requre: false
	},
	password : {
		type: String,
		require: true
	}
});

Mongoose.model('userSchema', user);

Mongoose.connect('mongodb://localhost:27017/demo', function(err) {
	if (err) {
		console.log(err);
		process.exit(-1);
	}
	console.log('Database Connected Successfully');
});

module.exports = Mongoose;