// var express = require('express');
// var serveStatic = require('serve-static');
// var http = require('http');
// var app = express();
// var PORT = 9001;

// app.set('port', PORT);

// app.use(serveStatic( '../static' ));

// http.createServer(app).listen(app.get('port'), 'localhost', function(){
//   console.log("Express server listening on port " + app.get('port'));
// });

var path = require('path');
var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('../static'))
// app.use(serveStatic(__dirname + '/public'))
app.listen(3000)