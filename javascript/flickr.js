var obj 		= require('./data');
var request 	= require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method 		= 'flickr.photos.search',
    	fs      = require('fs'),
 		Q       = require('q');

var last;
oLength = 0;
	
function objPromise() {
	var arr = [];
	return new Promise(function(resolve, reject) {
		for (cat in obj) {
			for (word in obj[cat]) {
				var wordObj = obj[cat][word]
				arr.push({
					word: word,
					wordObj: wordObj
				})
			};
		};
		// resolve (arr)
		var newArr = [];
		arr.reduce(function(promise, curr){
			return promise.then(function(val) {
				// console.log( curr );
				// console.log( val );
				if ( val === 1 ) {
					console.log("searching")
					return search( curr.word, curr.wordObj );
				}
				else {
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

objPromise().then (function(response){
	console.log(obj)
	fs.writeFile('dataWimagesNEW.json', JSON.stringify(obj), function( err ) {
    	console.log(err);
  	});
}); 


//function that makes a request and 
//returns resolve(callback)
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

//creating a function that 
function search( word, wordObj ) {
	//calls the function that returns a 
	//takes in url and query data 
	//makes a promise object 
	return requestAsPromise( API_BASE, {
		method: method,
		api_key: API_KEY,
		text: word,
		format: 'json',
		nojsoncallback: 1,
		sort: 'relevance'
	})
	
	.then(function(response){
		console.log("writinging imageObject", word)
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
		// if (typeof data[5] !== "undefined") {

		// 	var title = data[5].title;
		// 	var id = data[5].id;
		// 	var server = data[5].server;
		// 	var secret = data[5].secret;
		// 	var farmID = data[5].farm;
		// 	var img = 'https://farm'+farmID+'.staticflickr.com/'+server+'/'+id+'_'+secret+'.jpg';
		// 	var div = "<div style='border: 1px solid black'>"+img+"<p>"+title+"</p><p><em>"+id+"</em></p></div>"
			
		// 	wordObj["img"] = img;
		// }

		return new Promise(function(resolve, reject){
			resolve(wordObj);
		});  

	})
}
