var React = require('react');
var imgObj = require('./dataWimages'); 
var Router = require('director').Router;
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

module.exports = React.createClass({
	render: function() {
		var categoryButtons = data.map(function(title) {
	  		return (
	  			
				<a href={"/#levelOne/"+title} key={title}>
		          {title}!!!
		        </a>

		      );
	  	});
	    return (
	     <div>
	  		<h1> Learn Bangla</h1>
	  		{categoryButtons} 
	  		
	  	</div>
		);

		
	}


});



//return (<a href="/#foo/1">Click here</a>);