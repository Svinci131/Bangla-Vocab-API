function flattenPromiseDictionaryObj (obj) {
	var arr = [];
	for (cat in obj) {
			for (word in obj[cat]) {
				var wordObj = obj[cat][word]
				arr.push({
					word: word,
					wordObj: wordObj
					});
		}
	}
	return arr;
}

return  {
	flattenPromiseDictionaryObj: flattenPromiseDictionaryObj
}