const Express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')

var app = Express();

app.use(bodyParser.json());
app.use('/', router);
app.use(Express.static(__dirname));

app.listen(8080, 'localhost', function(err) {
	if(err) {
		console.log(err);
		process.exit(-1);
	}
	console.log('Server listening on port 8080');
});