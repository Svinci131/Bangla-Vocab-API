//http://www.shabdkosh.com/bn/translate?e=cheese&l=bn

var obj = require('./dataWimages');

//for each cat for each obj 

//http://www.shabdkosh.com/bn/translate?e=WORD&l=bn

var request = require("request"),
  cheerio = require("cheerio"),
  // url="https://en.wikibooks.org/wiki/Bengali/Sounds"
  //http://www.lexilogos.com/keyboard/bengali.htm
  
url = "http://www.shabdkosh.com/bn/translate?e=cheese&l=bn"

request(url, function (error, response, body) {
	console.log("hello")
  if (!error) {
    var $ = cheerio.load(body),
    table = $('.wikitable').children().each(function(el){
    	console.log("here", (el))
    })
 
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});