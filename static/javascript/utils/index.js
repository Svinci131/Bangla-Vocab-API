function makePostRequest (data, route) {
    xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000'+route);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200 && xhr.responseText) {
	        alert(xhr.responseText);
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	data = formatData(data);
	xhr.send(data);
}

function formatData (data) {
	return Object.keys(data).reduce(function(string, key) {
		let param = key+"="+data[key];
		string+=encodeURI(param);
	}, "");
}

function makeTestPostRequest () {
	var newName = 'John Smith',
    xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://localhost:3000/users');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200 && xhr.responseText !== newName) {
	        alert('Name is now ' + xhr.responseText);
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send(encodeURI('name=' + newName));
}

module.exports = {
	makePostRequest: makePostRequest,
	makeTestPostRequest: makeTestPostRequest
}