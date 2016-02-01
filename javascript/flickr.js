var obj 		= require('./data');
var request 	= require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method 		= 'flickr.photos.search';
 		Q       = require('q');



for ( var cat in obj ) {
	for ( var word in obj[cat] ){
		var wordObj = obj[cat][word]
		search(word, wordObj);
	}
}

function search( key, obj ) {
	request
	  	.get(API_BASE)

		.query({
			method: method,
			api_key: API_KEY,
			text: key,
			format: 'json',
			nojsoncallback: 1,
			sort: 'relevance'
		})

		.end(function(err, response){

			if ( err ) {
				return;
			}
			var data = JSON.parse( response.text );
				data = data.photos.photo; 
			if (typeof data[5] !== "undefined") {
				var title = data[5].title;
				var id = data[5].id;
				var server = data[5].server;
				var secret = data[5].secret;
				var farmID = data[5].farm;
				var img = 'https://farm'+farmID+'.staticflickr.com/'+server+'/'+id+'_'+secret+'.jpg';
				var div = "<div style='border: 1px solid black'>"+img+"<p>"+title+"</p><p><em>"+id+"</em></p></div>"
				
				if (key === "yellow"){
					obj["img"] = img
					console.log(obj.img)
					//when they're all resolved 
					
				}
			  	
			}
			//console.log("HERE",word)
				//console.log(data[0].title)
		});	
}
// obj["colors"]["yellow"]["foo"] ="foo"
console.log(obj.colors.yellow.img)