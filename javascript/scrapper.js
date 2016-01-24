var request = require("request"),
    cheerio = require("cheerio"),
    fs = require('fs'),
    url="http://mylanguages.org/multimedia/bengali_audio_colors.php"

var group = url.split("_");
    group = group[group.length-1].split(".")[0]

var obj = {};

request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body),

      word = $(".table tbody").eq(1).children().each(function (idx, el) { 
                el = $(el);
                var english = el.find('img').attr('alt'); 
                var bLetters = el.find('b').html();
                var all = el.find('td').text();
                if ( typeof obj[group] === "undefined") {
                  obj[group] = {};
                }

                obj[group][english] = {"english": english,
                                        "type": group, 
                                        "bLetters": bLetters
                };
                //console.log(all);
      });
      
      console.log(obj)
    } else {
      console.log("We’ve encountered an error: " + error);
    }

  });


