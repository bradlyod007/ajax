const Express = require('express');
var Controller = require('./Controller');

var router = Express.Router();

router.post('/', function(req, res) {
	Controller.addUser(req.body).then(function(data) {
		res.status(data.status).send({message: data.message});
	}).catch(function(err) {
		res.status(err.status).send({message: err.message});
	});
});

router.get('/', function(req, res) {
	Controller.getAllUsers().then(function(data) {
		res.status(data.status).send({data: data.usersDetails});
	}).catch(function(err) {
		res.status(err.status).send({message: err.message});
	});
});

router.get('/:id', function(req, res) {
	Controller.getUser(req.params.id).then(function(data) {
		res.status(data.status).send({data: data.userDetails});
	}).catch(function(err) {
		res.status(err.status).send({message: err.message});
	});
});

router.put('/:id', function(req, res) {
	Controller.updateUser(req.params.id, req.body).then(function(data) {
		res.status(data.status).send({message: data.message});
	}).catch(function(err) {
		res.status(err.status).send({message: err.message});
	});
});

router.delete('/:id', function(req, res) {
	Controller.deleteUser(req.params.id).then(function(data) {
		res.status(data.status).send({message: data.message});
	}).catch(function(err) {
		res.status(err.status).send({message: err.message});
	});
});

module.exports = router;