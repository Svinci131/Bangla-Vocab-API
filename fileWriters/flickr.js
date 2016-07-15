var obj 		= require('./data');
var request 	= require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method 		= 'flickr.photos.search',
    	fs      = require('fs'),
 		Q       = require('q'); //**better off w native js promises

var last;
oLength = 0;

//()=>arr
function flattenPromiseDictionaryObj () {
	var arr = [];
	for (cat in obj) {
			for (word in obj[cat]) {
				var wordObj = obj[cat][word]
				arr.push({
					word: word,
					wordObj: wordObj
					});
		}
	}
	return arr;
}
//generic function that promisifies requests
function requestAsPromise( url, queryData ) {
    return new Promise(function(resolve){
		request
			.get( url )
			.query( queryData )
			.end(function(err, response){
				if ( err ) {
					reject( err );
					return;
				}
				resolve( response );
			});
	});
}
//* note to self: this can be way simpler
function objPromise() {
	var arr = flattenPromiseDictionaryObj ();
	return new Promise(function(resolve, reject) {
		var newArr = [];
		//reduce promise to an object with 
		arr.reduce(function(promise, curr){
			return promise.then(function(val) {
				//if it's the inital promise object.. just search
				if ( val === 1 ) {
					return search( curr.word, curr.wordObj );
				}
				else {
					//push value to newArr
					newArr.push( val );
					return search( curr.word, curr.wordObj );
				}
			});
		}, new Promise(function(resolve, reject) {
			resolve(1);
		})).then(function(){
			resolve( newArr );
		});
	});
}

//creating a function that 
//(str, obj) => 
function search( word, wordObj ) {
	//make request
	return requestAsPromise( API_BASE, {
		method: method,
		api_key: API_KEY,
		text: word,
		format: 'json',
		nojsoncallback: 1,
		sort: 'relevance'
	})
	//*note to self- this is way too long
	//loop through results and create an image object with the top five links
	.then(function(response){
		var data = JSON.parse( response.text );
			data = data.photos.photo; 
		var imgObj = {}; 

		for (var i = 5; i > 0; i--){
			if (typeof data[i] !== "undefined") {
				var title = data[i].title;
				var id = data[i].id;
				var server = data[i].server;
				var secret = data[i].secret;
				var farmID = data[i].farm;
				var img = 'https://farm'+farmID+'.staticflickr.com/'+server+'/'+id+'_'+secret+'.jpg';
				var div = "<div style='border: 1px solid black'>"+img+"<p>"+title+"</p><p><em>"+id+"</em></p></div>"
				imgObj["0"+i]=img;
			}
		}

		wordObj["img"] = imgObj;
		//resolve 
		return new Promise(function(resolve, reject){
			resolve(wordObj);
		});  
	});
}


objPromise().then (function(response){
	fs.writeFile('dataWimages.json', JSON.stringify(obj), function( err ) {
    	console.log(err);
  	});
}); 

