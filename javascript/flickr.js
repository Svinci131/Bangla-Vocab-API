var obj = require('./data');
var request = require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method = 'flickr.photos.search';
var arr = ["red", "blue", "green", "colors"]
arr.forEach (function (i) { 

request
  	.get(API_BASE)

	.query({
		method: method,
		api_key: API_KEY,
		text: i,
		format: 'json',
		nojsoncallback: 1,
		sort: 'relevance'
	})

	.end(function(err, response){
		var data = JSON.parse( response.text );
			data = data.photos.photo; 
			//console.log( data )

// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
		var title = data[5].title;
		var id = data[5].id;
		var server = data[5].server;
		var secret = data[5].secret;
		var farmID = data[5].farm;
		var img = 'https://farm'+farmID+'.staticflickr.com/'+server+'/'+id+'_'+secret+'.jpg';
		var div = "<div style='border: 1px solid black'>"+img+"<p>"+title+"</p><p><em>"+id+"</em></p></div>"
		

	  	console.log(img)
	});

}); 


// console.log(obj.colors)