var express = require('express');
var serveStatic = require('serve-static');
var http = require('http');
var app = express();
var PORT = 9001;

app.set('port', PORT);

app.use('/', serveStatic( 'static', {'index': [ 'index.html' ]}))

http.createServer(app).listen(app.get('port'), 'localhost', function(){
  console.log("Express server listening on port " + app.get('port'));
});