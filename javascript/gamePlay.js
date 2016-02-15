var obj    = require('./data'); 
var imgObj = require('./dataWimage'); 

// //Create buttons for each category 
for (cat in obj) {
	for (word in obj[cat]) {
		console.log(imgObj[word])
	}
}

