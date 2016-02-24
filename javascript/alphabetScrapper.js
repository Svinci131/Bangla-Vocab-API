var request = require("request"),
  cheerio = require("cheerio"),
  // url="https://en.wikibooks.org/wiki/Bengali/Sounds"
url = "https://en.wikipedia.org/wiki/Bengali_alphabet"

request(url, function (error, response, body) {
	console.log("hello")
  if (!error) {
    var $ = cheerio.load(body),

    table = $(".wikitable").each(function (el) {
    	el = $(el);
    	title = el[0]
    	console.log(el[0])
    	//get the head and each col text by order
    });
   // console.log(table)
    // $('.wikitable').children().each(function(el){
    // 	console.log($(el))
    // })
    //not the first 

    // word = $(".word-and-pronunciation h1").html();
    // def = $(".definitions-page .card-box p").html()
      
    
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
