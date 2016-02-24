var React = require('react');
var imgObj = require('./dataWimages_NEW'); 
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

console.log(data)
module.exports = React.createClass({
	render: function() {
		var categoryButtons = data.map(function(title) {
			
		
			if (title === "food") {
				var firstKey = (Object.keys(imgObj[title])[1]);
				var image = imgObj[title][firstKey].img["03"];
			}
			else if (title === "colors") {
				var firstKey = (Object.keys(imgObj[title])[0]);
				var image = imgObj[title][firstKey].img["04"];
			}
			else if (title === "numbers") {
				var firstKey = (Object.keys(imgObj[title])[0]);
				var image = imgObj[title][firstKey].img["05"];
			}
			else if (title === "clothes") {
				var firstKey = (Object.keys(imgObj[title])[3]);
				var image = imgObj[title][firstKey].img["01"];
			}
			else if (title === "objects") {
				var firstKey = (Object.keys(imgObj[title])[0]);
				var image = imgObj[title][firstKey].img["01"];
			}
			else if (title === "body") {
				var firstKey = (Object.keys(imgObj[title])[3]);
				var image = imgObj[title][firstKey].img["01"];
			}
			else {
				var firstKey = (Object.keys(imgObj[title])[3]);
				var image = imgObj[title][firstKey].img["04"];
			}
			
				
			
	  		return (
	  			<div className="card">
			      <div className="image image--card" style={{minHeight: '150px', backgroundImage: 'url('+image+')'}}>
			      	<img src={image} />
			      </div>
			     <div className="content">
			        <a href={"#levelOne/"+title} className="header">{title}</a>
			      </div>
			  	</div>
		      );
	  	});
	    return (
	     <div className="ui three stackable cards">
	  		{categoryButtons}
	  	</div>
		);

		
	}


});



//return (<a href="/#foo/1">Click here</a>);