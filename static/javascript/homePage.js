var React = require('react');
var imgObj = require('./dataWimages_NEW'); 
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

console.log(data)
module.exports = React.createClass({
	render: function() {
		var firstKey;
		var image;
		var categoryButtons = data.map(function(title) {
			
				
			if (title === "food") {
				 firstKey = (Object.keys(imgObj[title])[1]);
				 image = imgObj[title][firstKey].img["03"];
			}
			else if (title === "adverbs") {
				
				 firstKey = (Object.keys(imgObj[title])[0]);
				 image = imgObj[title][firstKey].img["01"];
				 title = "Adverbs of Time"
			}

			else if (title === "nouns") {
				console.log(imgObj[title])
				 firstKey = (Object.keys(imgObj[title])[1]);
				 image = imgObj[title][firstKey].img["01"];
				 title = "Body II"
			}
			else if (title === "colors") {
				 firstKey = (Object.keys(imgObj[title])[0]);
				 image = imgObj[title][firstKey].img["04"];
			}
			else if (title === "numbers") {
				 firstKey = (Object.keys(imgObj[title])[0]);
				 image = imgObj[title][firstKey].img["05"];
			}
			else if (title === "clothes") {
				 firstKey = (Object.keys(imgObj[title])[3]);
				 image = imgObj[title][firstKey].img["01"];
			}
			else if (title === "objects") {
				 firstKey = (Object.keys(imgObj[title])[0]);
				 image = imgObj[title][firstKey].img["01"];
			}
			else if (title === "body") {
				 firstKey = (Object.keys(imgObj[title])[3]);
				 image = imgObj[title][firstKey].img["01"];
			}
			else {
				 firstKey = (Object.keys(imgObj[title])[0]);
				 image = imgObj[title][firstKey].img["04"];
			}
			
			// var label = title.split(' ')[0].join('_')
			// console.log(label)	

			
	  		return (
	  			<div className="card">
			      <div className="image image--card" style={{minHeight: '150px', backgroundImage: 'url('+image+')'}}>
			      	<img src={image} />
			      </div>
			     <div className="content">
			        <a href={"#levelOne/"+ title.split(' ')[0].toLowerCase()} className="header">{title}</a>
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