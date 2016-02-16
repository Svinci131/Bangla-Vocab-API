var React = require('react');
var imgObj = require('./dataWimagesNEW'); 
var Router = require('director').Router;
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);


module.exports = React.createClass({
	render: function() {
		console.log(data)
		var categoryButtons = data.map(function(title) {
	  		return (
				<a href={"/#game/"+title} key={title}>
		          {title}
		        </a>
		      );
	  	});
	    return (
	     <div> {categoryButtons} </div>
		);

		
	}


})


//return (<a href="/#foo/1">Click here</a>);