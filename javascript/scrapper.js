var request = require("request"),
    cheerio = require("cheerio"),
    fs = require('fs'),
    obj = {};

var url= "http://mylanguages.org/multimedia/bengali_audio_colors.php";
var group = url.split("_");
    group = group[group.length-1].split(".")[0]



request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body),

      word = $(".table tbody").eq(1).children().each(function (idx, el) { 
                el = $(el);
                var english = el.find('img').attr('alt'); 
                var bLetters = el.find('b').html();
                var all = el.find('td').text();
                var allEIndx = english.length; 
                var bangla = all.substring (allEIndx)
                var bLetterIndex = null;

                for (var i = 0; i < bangla.length; i++){
                  if (bangla.charCodeAt(i) > 123){
                    var bLetterIndex = i; 
                    break;
                  }
                }
                bangla = bangla.substring (0, bLetterIndex)

                if ( typeof obj[group] === "undefined") {
                  obj[group] = {};
                }

                obj[group][english] = { 
                  "english": english,
                  "type": group, 
                  "bangla": bangla,
                  "bLetters": bLetters,
                  "index":idx
                };
      });
      
      console.log(obj)
    } else {
      console.log("We’ve encountered an error: " + error);
    }

  });


