var express = require('express');
var app     = express();
var server  = require('http').createServer(app);

var fs      = require('fs');
var config  = require('./config.json');

server.listen(config.serverApiPort, function () {
	console.log('server started at port: '+config.serverApiPort);
});

var userData = {
   "account": {
     "email": "",
     "password": ""
 },
 "name": {
   "first": "",
   "middle": "",
   "last": ""
 },
 "properties": {
   "age": 18,
   "gender": "",
   "interests": []
 }
};

/**
* Set some Access Control headers.
*/
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	return next();
});


app.get('/api/getuser', function (req, res) {

		var response = JSON.stringify(userData);	

		res.writeHead(200, {'content-type' : 'application/json'});
		res.write(response);
		res.end();
});

app.post('/api/saveuser', function (req, res) {

	console.info(arguments, 'req saveUser');
	var response = JSON.stringify({'status' : 'ok', 'message' : 'ok'});	

	res.writeHead(200, {'content-type' : 'application/json'});
	res.write(response);
	res.end();
});
