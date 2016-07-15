var request = require("request"),
    cheerio = require("cheerio"),
    fs      = require('fs'),
    Q       = require('q'),
    obj     = {};

var url   = "http://mylanguages.org/learn_bengali.php";

//promisify request
//(str) => promise obj
var requestPromise = function( url ) {
  var d = Q.defer();
  
  request( url, function( err, response, body ){
    if ( err ) {
      d.reject( err );
    }
    else {
      d.resolve( body );
    }
  });

  return d.promise;
}

//console.log( 'Fetching: ' + url + '\n' );
requestPromise( url )
.then(function(body){
  var $ = cheerio.load(body),
      arr = [],
      links = $(".sidebar-menu li a").each(function(idx, el) {
      el = $(el);
      if (idx >= 8 && idx<=33){
        arr.push( fetchData( el.attr('href') ) );
      }
  });
  return Q.all( arr );
})

.then(function(){
  fs.writeFile('data.json', JSON.stringify(obj), function( err ) {
    console.log('done!');
  }); 
})
.fail(function(err){
  console.log("error")
});

function fetchData( url ) {
  var d = Q.defer();

  requestPromise( url )
  .then(function(body) {
    var group = url.split("_");
    group = group[group.length-1].split(".")[0]
    
    //there are a lot more groups than we end up with as objects 
    var $ = cheerio.load(body),
        word = $(".table tbody").eq(1).children("tr").children("td").each(function (idx, el) { 
                  el = $(el);
                  var english = el.find('img').attr('alt');
                  var bLetters = el.find('b').html();
                  var all = el.text();
                  var info;
                  //if there are no el matching english 
                  if ( !english || !english.length ) {
                    var row = $(el.parent("tr")[0]);
                    var col = $(row[0]).children("td");
                    var english = $(col[0]).find("b").text()
                    var bLetters = $(col[1]).find("b").text()
                    var bangla = $(col[1]).text()   
                        all = bangla.split (" - ")
                        bangla = all[0]
                        bLetters = all[1];

                    if (typeof bLetters === "undefined") {
                      return;
                    }
                  }

                  else {
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
                  }
                    

                  info = { 
                    "english": english,
                    "type": group, 
                    "bangla": bangla,
                    "bLetters": bLetters,
                    "index":idx
                  };
                  if ( typeof obj[group] === "undefined") {
                    obj[group] = {};
                  }

                  obj[group][english] = info
      });
      d.resolve();
  });

  return d.promise;
}