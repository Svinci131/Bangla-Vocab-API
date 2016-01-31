var fs = require('fs');

// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
// });

var http = require('http');


var server = http.createServer(function(request,response){
	 response.writeHead(200, {"Content-Type": "text/json"});
	 fs.readFile('data.json', 'utf8', function(err,data){
	 	console.log(data)
	 	response.write( data );
	 	response.end();
	 })
});

server.listen(8080);