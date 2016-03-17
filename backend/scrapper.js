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
        // console.log(el.html())
        // popObj( el.attr('href'), idx, 32 );
        //console.log( 'About to fetch: ' + el.attr('href') + '\n' );
        arr.push( fetchData( el.attr('href') ) );
      }
  });

  return Q.all( arr );
})
.then(function(){
  // console.log(obj)
// //   // console.log( 'writing to file...' );
  fs.writeFile('data.json', JSON.stringify(obj), function( err ) {
    console.log('done!');
  });
    
})
.fail(function(err){
  console.log("error")
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
    
    //there are a lot more groups than we end up with as objects 
    var $ = cheerio.load(body),
        word = $(".table tbody").eq(1).children("tr").children("td").each(function (idx, el) { 
                  el = $(el);
                  // console.log('test')
                  var english = el.find('img').attr('alt');
                  
                  // console.log("HERE", group, english)
                  // create an alternet thing for the ones that are formatted differently 
                  var bLetters = el.find('b').html();
                  // console.log("01", bLetters)
                  var all = el.text();
                  var info;

                  // if (english !== all){
                    
                  //   //sad - সড্
                  //   //circular

                  //   //fromhoiteহওইটএ
                  // }
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
                      return
                    }
                    // return;
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