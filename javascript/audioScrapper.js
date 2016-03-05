//http://www.shabdkosh.com/bn/translate?e=cheese&l=bn

var obj = require('./dataWimages');
var root = "http://www.shabdkosh.com/bn/translate/"
for (cat in obj) {
  for (word in obj[cat]) {
    var wordObj = obj[cat][word]
    var bLetters = wordObj.bLetters
    //convert to urlcode 
    //if its longer than one english word 
      ///check the old site 
      /// 
    //request(root+urlcode+"-meaning-in-Bengali-English"
      //sorce click $("aud0")
      
      //http://www.shabdkosh.com/speech/sayit.php?id=bn9998&x=mp3
  }
}

//http://www.shabdkosh.com/bn/translate?e=WORD&l=bn

var request = require("request"),
  cheerio = require("cheerio"),
  // url="https://en.wikibooks.org/wiki/Bengali/Sounds"
  //http://www.lexilogos.com/keyboard/bengali.htm
//http://www.shabdkosh.com/bn/translate/%E0%A6%96%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B0/%E0%A6%96%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B0-meaning-in-Bengali-English


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