var React = require('react');
var Entities = require('html-entities').AllHtmlEntities;

module.exports = React.createClass({
	convertFromHex: function () {
		
		var hexEntities = this.props.data.bLetters; 
		hexEntities = hexEntities.split(";");
		hexEntities = hexEntities.slice(0, hexEntities.length-1)
		entities = new Entities();
		var arr = hexEntities.reduce(function(arr, curr){
 			var Char = entities.decode(""+curr+";")
 			arr.push( Char);
			return arr;
		}, []);

 		var bLetters = arr.join(" ")
 		// console.log("here", bLetters)
 		return (bLetters)

	},
	determineType:function () {

    	var bLetters = this.props.data.bLetters
    	if (bLetters[0] === '&'){
    		return (<span>{this.convertFromHex()}</span>)
    		console.log ("here", bLetters[0])
    	}
    	else {
    		return (<span>{bLetters}</span>)
    	}

    
	},
    render: function() {

        return (
            <p>
                {this.determineType()}
            </p>
        );
    }
});