var obj 		= require('./data');
var request 	= require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method 		= 'flickr.photos.search';
 		Q       = require('q');


//going through each word in each category, 
//making a call to the flickr api 
//saving the results as a new key for each word 
for ( var cat in obj ) {
	for ( var word in obj[cat] ){
		//push the words to an array or maybe push word:cat to and array 
		var wordObj = obj[cat][word]
		///push all of these search function/results to an array 
		search(word, wordObj);

	}
}

//function that makes a request and 
//returns resolve(callback)
function requestAsPromise( url, queryData ) {
	return new Promise(function(resolve, reject){
		request
			.get( url )
			.query( queryData )
			.end(function(err, response){
				if ( err ) {
					reject( err );
					return;
				}
				//resolve? 
				// console.log(response)
				resolve( response );
			});
	});
}

//creating a function that 
function search( word, wordObj ) {
	//calls the function that returns a 
	//takes in url and query data 
	//makes a promise object 
	requestAsPromise( API_BASE, {
		method: method,
		api_key: API_KEY,
		text: word,
		format: 'json',
		nojsoncallback: 1,
		sort: 'relevance'
	})
	//that has the then prop 
	//which we ust to say parse the response and use is it update the word object 
	.then(function(response){
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
			
			wordObj["img"] = img;
		}
		return new Promise(function(resolve, reject){
			resolve(wordObj);
		});
	})
	.then(function(wordObj){
		if (wordObj.english === "yellow") {
			console.log (obj)
		}
		// i'll be here now
		// this gets called after all that logic above
	});
}
// obj["colors"]["yellow"]["foo"] ="foo"
// console.log(obj.colors.yellow.img)