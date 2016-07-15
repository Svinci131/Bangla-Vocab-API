var request = require("request"),
    cheerio = require("cheerio"),
    alphabet = {},
    fs = require("fs"),
    url = "http://learn101.org/bengali_alphabet.php",
    requestPromise = promisifyRequest;

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
              //** note to self: should be constructor
              alphabet[idx]= { banglaLetter: bSymbol,
                              ital: ital,
                              eLetter: eLetter,
                              speechSound: speechSound
                            };
           }
    });
}).then (function(){
    fs.writeFile('alphabet.json', JSON.stringify(alphabet), function( err ) {
    console.log('done!');
  });
});

