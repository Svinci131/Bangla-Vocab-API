//INPROGRESS

var obj = require('./dataWimages');
var rootUrl = "http://www.shabdkosh.com/bn/translate/"

for (cat in obj) {
  for (word in obj[cat]) {
    var wordObj = obj[cat][word];
    var bLetters = wordObj.bLetters;
    var url = rootUrl+urlcode+"-meaning-in-Bengali-English";
    //request(root+urlcode+"-meaning-in-Bengali-English")
    //source.click $("aud0")
  }
}

//http://www.shabdkosh.com/bn/translate?e=cheese&l=bn
//http://www.shabdkosh.com/bn/translate?e=WORD&l=bn


