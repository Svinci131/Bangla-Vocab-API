var obj = require('../static/json/dataWImages');

//refactor this out for growth
function flattenPromiseDictionaryObj (obj, cb) {
	var arr = [];
	for (cat in obj) {
			for (word in obj[cat]) {
				var el = cb.apply(null, cat, word, obj);
				arr.push(el);
		}
	}
	return arr;
}

return  {
	flattenPromiseDictionaryObj: flattenPromiseDictionaryObj
}