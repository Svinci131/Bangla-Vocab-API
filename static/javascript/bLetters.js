var React = require('react');
var Entities = require('html-entities').AllHtmlEntities;

module.exports = React.createClass({
	convertFromHex: function () {
		console.log( this.props.data )
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

 		return (bLetters)

	},
    render: function() {
        return (
            <p>
                {this.convertFromHex()}
            </p>
        );
    }
});