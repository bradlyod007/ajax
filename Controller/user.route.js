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

//q,7,1221

var fs = require("fs");
var parse = require("csv-parse");

var inputFile = "file1.csv";

var router = express.Router();

router.post("/", function(req, res) {
  var data = req.body;
  dataline = "\r\n" + data.name + "," + data.address + "," + data.password;
  fs.appendFile("file1.csv", dataline, function(err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  res.send("Successfully Added");
});

router.get("/", function(req, res) {
  var parser = parse({ delimiter: "," }, function(err, data) {
    var users = [];
    data.forEach(function(line) {
      var user = [line[0], line[1], line[2]];
      users.push(user);
    });
    res.send({ data: users });
  });
  fs.createReadStream(inputFile).pipe(parser);
});

router.get("/", function(req, res) {
  Controller.getUsers()
    .then(function(data) {
      var total = 0;

      for (i = 0; i < data.users.length; i++) {
        total += data.users[i]["mark"];
      }

      res.status(data.status);
      res.send({ total: total });
    })
    .catch(function(err) {
      res.status(err.status).send({ message: err.message });
    });
});

router.post("/", function(req, res) {
  Controller.addUser(req.body)
    .then(function(data) {
      res.status(data.status).send({ message: data.message });
    })
    .catch(function(err) {
      res.status(err.status).send({ message: err.message });
    });
});

router.get("/:id", function(req, res) {
  Controller.getUser(req.params.id)
    .then(function(data) {
      res.status(data.status).send({ mark: data.user[0]["mark"] });
    })
    .catch(function(err) {
      res.status(err.status).send({ message: err.message });
    });
});

module.exports = router;
