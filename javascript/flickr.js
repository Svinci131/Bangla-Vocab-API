var obj 		= require('./data');
var request 	= require("superagent");
var API_KEY 	= "fe03e6cf12d2f0ad16e81c15cc926317";
var API_BASE 	= 'https://api.flickr.com/services/rest/';
var method 		= 'flickr.photos.search',
 		Q       = require('q');

var last;

oLength = 0;
	
function objPromise() {
	//create a new promise that resolves after map is finished 
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
				console.log( val );
				if ( val === 1 ) {
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
	console.log(response)
})

// Promise.all(objPromise()).then (function(response){
// 	console.log(response)
// })

// map (function (cat) {
// 	var cLength = Object.keys(obj[cat]).length
// 	oLength += cLength

// 	//Olength = obj[cat][Object.keys(obj[cat])[Object.keys(obj[cat]).length - 1]]
// 	Object.keys(obj[cat]).map (function (word) {
// 		var wordObj = obj[cat][word]
// 		// search(word, wordObj)
// 		//for each push a promise obj that resolves when that wordObj has been updated
		
// 		)
// 	});
// });


//it's starting this then it's doing all of this 
// Promise.all(arr).then(function(values){
// 	console.log(oLength, arr.length)
//  //console.log(values)
// });


//function that makes a request and 
//returns resolve(callback)
function requestAsPromise( url, queryData ) {
    return new Promise(function(resolve){
		request
			.get( url )
			.query( queryData )
			.end(function(err, response){
				if ( err ) {
					//comes with the q territory 
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
	return requestAsPromise( API_BASE, {
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
	// .then(function(){
	// 	// return new Promise(function(resolve, reject){
	// 	// 	resolve(wordObj);
	// 	// });  
		
	// });
}

// obj["colors"]["yellow"]["foo"] ="foo"
// console.log(obj.colors.yellow.img)