var request = require("request"),
    cheerio = require("cheerio"),
    alphabet = {},
    fs = require("fs"),
url = "http://learn101.org/bengali_alphabet.php"
//url = "http://mylanguages.org/bengali_alphabet.php"
    // console.log(alphabet)
    // table = $("table").children("tr").each(function (idx, el) { 
    //        el = $(el);
    //          console.log("here")
    //          var b = $(el.children()[0]).text();
    //          var e = $(el.children()[1]).text();
    //          var sound = $(el.children()[2]).text();
    //          console.log(b,e, sound)
    //      });

var requestPromise = function( url ) {
  return new Promise(function (resolve, reject){
    request( url, function( err, response, body ){
      if ( err ) {
        reject( err );
      }
      else {
        resolve( body );
      }
    });
  });
}

requestPromise( url )
.then(function(body){
    var $ = cheerio.load(body),
    table = $(".table").children("tr").children("th").each(function (idx, el) { 
           el = $(el);
           var bSymbol = el.text()
           var td = el.next();
           var ital = td.find("i").text()
           var eLetter = td.find("b").text();
           var vowels = ["a","e","i","o","u"];
           var speechSound = "consonant";

           for (var i = 0; i <vowels.length; i ++) {
              if (eLetter.split("")[0] === vowels[i]) {
                speechSound = "vowel"; 
                break;
              }
           }
           if (eLetter.length > 0) {
              alphabet[idx]= { banglaLetter: bSymbol,
                              ital: ital,
                              eLetter: eLetter,
                              speechSound: speechSound
                            } 
           }
    });
}).then (function(){
    fs.writeFile('alphabet.json', JSON.stringify(alphabet), function( err ) {
    console.log('done!');
  });
});

