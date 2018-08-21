var Mongoose = require('../DBConfig');

var userSchema = Mongoose.model('userSchema');

var Controller = function() {
	this.addUser = function(data) {
		return new Promise(function(resolve, reject) {
			var newUser = new userSchema({
				name : data.name,
				address : data.address,
				password : data.password
			});
			newUser.save().then(function() {
				resolve({status: 200, message: "User successfully added"});
			}).catch(function(err) {
				reject({status: 500, message: "Error adding user - " + err});
			});
		});
	}

	this.getAllUsers = function() {
		return new Promise(function(resolve, reject) {
			userSchema.find().exec().then(function(data) {
				resolve({status: 200, usersDetails: data});
			}).catch(function(err) {
				reject({status: 500, message: "Error finding users - " + err});
			});
		});
	}

	this.getUser = function(id) {
		return new Promise(function(resolve, reject) {
			userSchema.find({_id: id}).exec().then(function(data) {
				resolve({status: 200, userDetails: data});
			}).catch(function(err) {
				reject({status: 500, message: "Error finding user - " + err});
			});
		});
	}

	this.updateUser = function(id, data) {
		return new Promise(function(resolve, reject) {
			userSchema.update({_id: id}, data).then(function() {
				resolve({status: 200, message: "User Successfully Updated"});
			}).catch(function(err) {
				reject({status: 500, message: "Error updating user - " + err});
			});
		});
	}

	this.deleteUser = function(id) {
		return new Promise(function(resolve, reject) {
			userSchema.remove({_id: id}).then(function() {
				resolve({status: 200, message: "User Successfully Deleted"});
			}).catch(function(err) {
				reject({status: 500, message: "Error deleting users - " + err});
			});
		});
	}
}

module.exports = new Controller();