var express = require('express');
var app     = express();
var server  = require('http').createServer(app);

var fs      = require('fs');
var config  = require('./config.json');

server.listen(config.serverPort, function () {

	console.log('server started at port: '+config.serverPort);
});

app.get('*', function (req, res) {
	var url = (req.url === '/' ? '/index.html' : req.url);
	    url = url.split('?')[0];

	//Protect this file
	if (url === '/index.js') {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('404 file not found');
		res.end();
		return;
	}

	fs.readFile(__dirname + url, function (err, data) {
		if (err) {
			console.log(err, 'not found ');
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write('404 file not found');
			res.end();
			return;
		}
		
		var header      =  {'Content-Type': 'text/html'};;
		var reponseCode = 200;

		switch (url.split('.').pop()) {
			case 'css' :
				header = {'Content-Type': 'text/css'};
			break;
			case 'js' :
				header = {'Content-Type': 'text/js'};
			break;
			case 'html' :
				header = {'Content-Type': 'text/html'};
			break;
			case 'png' :
				header = {'Content-Type': 'image/png'};
			break;
			case 'woff' :
				header = {'Content-Type': 'application/x-font-woff'};
			break;
			case 'woff' :
				header = {'Content-Type': 'application/x-font-woff'};
			break;
			case 'eot' :
				header = {'Content-Type': 'application/vnd.ms-fontobject'};
			break;
			case 'ttf' :
				header = {'Content-Type': 'font/ttf'};
			break;
			case 'svg' :
				header = {'Content-Type': 'image/svg+xml'};
			break;
			case 'svg' :
				header = {'Content-Type': 'font/opentype'};
			break;
			default:
				console.log('unkown file type');
				reponseCode = 404;
				data        = 'unkown file type';
		}

		res.writeHead(reponseCode, header);
		res.write(data);
		res.end();
	});
});
