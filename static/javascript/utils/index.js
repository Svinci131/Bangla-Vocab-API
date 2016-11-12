
function makePostRequest () {
	var newName = 'John Smith',
    xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://localhost:3000/users');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200 && xhr.responseText !== newName) {
	        alert('Something went wrong.  Name is now ' + xhr.responseText);
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send(encodeURI('name=' + newName));
}

module.exports = {
	makePostRequest: makePostRequest
}