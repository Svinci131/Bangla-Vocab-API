var request = require("request"),
    cheerio = require("cheerio"),
    fs      = require('fs'),
    Q       = require('q'),
    obj     = {};



var url   = "http://mylanguages.org/learn_bengali.php";
//var test  = "http://mylanguages.org/multimedia/bengali_audio_colors.php";

  //Returns a "deferred" object with a:
  //promise property,resolve(value) method,reject(reason) method, notify(value) method, makeNodeResolver() method
//
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
        // popObj( el.attr('href'), idx, 32 );
        //console.log( 'About to fetch: ' + el.attr('href') + '\n' );
        arr.push( fetchData( el.attr('href') ) );
      }
  });

  return Q.all( arr );
})
.then(function(){
// //   // console.log( 'writing to file...' );
  fs.writeFile('data.json', JSON.stringify(obj), function( err ) {
    console.log('done!');
  });
    
})
.fail(function(err){

});

//runs function requestPromise on URL 
  //gets each link in the scraped site 
  //runs fetched data on it and pushes it to an array 

//then
function fetchData( url ) {
  var d = Q.defer();

  requestPromise( url ).then(function(body) {
    //console.log( 'Found: ' + url + '\n' );
    var group = url.split("_");
    group = group[group.length-1].split(".")[0]
    var $ = cheerio.load(body),

        word = $(".table tbody").eq(1).children().each(function (idx, el) { 
                  el = $(el);
                  var english = el.find('img').attr('alt');
                  // console.log( english ) 
                  var bLetters = el.find('b').html();
                  var all = el.find('td').text();
                  if ( !english || !english.length ) {
                    return;
                  }
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
      d.resolve();
  });

  return d.promise;
}
//module.exports = obj;
//request promise is a function that updates and object 

/*
request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body),
      links = $(".sidebar-menu li a").each(function(idx, el) {
        el = $(el);
        if (idx >= 8 && idx<=32){
          // console.log(el.attr("href"), idx);
          popObj( el.attr('href'), idx, 32 );
        }
      });
    }
});

function popObj( test, curr, last ) {
  request(test, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body),

        word = $(".table tbody").eq(1).children().each(function (idx, el) { 
                  el = $(el);
                  var english = el.find('img').attr('alt');
                  console.log( english, curr, last ) 
                  var bLetters = el.find('b').html();
                  var all = el.find('td').text();
                  if ( !english || !english.length ) {
                    return;
                  }
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

                  if ( curr === last ) {
                    console.log( obj );
                  }
        });
        
        //console.log(obj)
      } else {
        //console.log("We’ve encountered an error: " + error);
      }

    });  
}

setTimeout(function(){
  console.log('#######')
  console.log(obj)
}, 5000)

*/
