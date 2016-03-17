var React = require('react');
var alphaObj = require('../json/alphabet'); 

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
		var boxes = this.state.letters.map(function (el) {
			console.log(el)
			return (<div className="column">
				<h1><b>{el.banglaLetter}</b></h1>

				</div>)
		});
		return (boxes)
	},
	render: function() {
		// var squares = this.state.letters.map(function (el) {
		// 	console.log(el)
		// 	return (<div className="column">
		// 		<h1><b>{el.banglaLetter}</b></h1>

		// 		</div>)
		// });
		

		 return (
		 <div>
	      <h1>Alphabet</h1>
	      <div id = "letters" className="ui four column centered grid"> {this.squares()}</div>
	      </div>
	      
	   
		)
	}
});