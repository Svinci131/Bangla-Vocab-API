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

			return (
				<div className="column">
					<div className="ui two column grid">
						<div className="alphabet-large-col column">
							<h1 className="alphabet-large">{el.banglaLetter}</h1>
						</div>
						<div className="column">
							<p><i>{el.ital}</i></p>
							<p><b>{el.eLetter}</b></p>
						</div>
					</div>
				</div>)
		});
		return (boxes)
	},
	render: function() {
		 return (
		 	<div>
	      		<h1>Alphabet</h1>

	      		<div id = "alphabet-container" className="ui doubling three column centered grid">
	       			{this.squares()}
	       		</div>
	     	</div>
	      
	   
		)
	}
});