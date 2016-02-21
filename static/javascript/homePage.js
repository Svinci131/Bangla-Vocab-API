var React = require('react');
var imgObj = require('./dataWimagesNEW'); 
var Router = require('director').Router;
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

module.exports = React.createClass({
	render: function() {
		var categoryButtons = data.map(function(title) {
	  		return (
				<a className="cat__btn" href={"/#levelOne/"+title} key={title}>
		          {title}
		        </a>

		      );
	  	});
	    return (
	     <div className='cat'>
	  		<h1 className='cat__title'>Learn Bangla</h1>
	  		<div className='cat__btnHolder'>{categoryButtons}</div> 
	  		
	  	</div>
		);

		
	}


});



//return (<a href="/#foo/1">Click here</a>);