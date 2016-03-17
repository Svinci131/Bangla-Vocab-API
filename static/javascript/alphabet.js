var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		var letters = Object.keys(this.props.data).reduce(function( arr, currentItem) {
			arr.push(this.props.data[currentItem]);
			return arr;
		}.bind(this), []);

		return {
			letters: letters
		}
	},
	squares: function () {

	},
	render: function() {
		// var squares = this.state.letters.map(function (el) {
		// 	return (<div className="four wide column">el.bLetter</div>)
		// });

		 return (
	      <h1>Alphabet</h1>
	      
	   
		)
	}
});