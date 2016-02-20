var React = require('react');
var imgObj = require('./dataWimagesNEW'); 
var Router = require('director').Router;

module.exports = React.createClass({
	getInitialState: function() {
		var category = this.props.data[this.props.id];
		var list = Object.keys(category).reduce(function(arr, currentItem) {
			arr.push( category[currentItem]);
			return arr;
		}, []);
			
		return {
			//Get the data object for that category - save as an array 
			data: list,
			currentCard: null,
			Index: null,
		}
	},
	componentDidMount:function () {
		this.getRandom()
	}, 
	//Get a random item and set current card to that item 
	getRandom:function (){
		var listLength = (this.state.data.length)-1; 
			var index =	Math.floor(Math.random()*(listLength));
			this.setState({
				currentCard: this.state.data[index], 
				Index:index
			}, function() {
				var words = this.state.data.reduce(function( arr, currentItem) {
				arr.push( currentItem.english);
				return arr;
				}, []);
				console.log(words)
			});
	},
	//Draw card
	levelTwo: function() {

		if (this.state.currentCard !== null) {
			console.log(this.state.currentCard.english)
			return (
				<div>
					<img src={""+this.state.currentCard.img}/>
					<p>{this.state.currentCard.bangla}</p>
					<input type="text" placeholder="Type English" onKeyPress={this.getInput}
						id={this.state.currentCard.english}>
					</input>
					<button className="hint">hint</button>
				</div>)
		}
	},
	//See if they wrote word correctly
	getInput:function (e) {
		//get input 
		if ( e.which === 13 ) {
			var input = e.target.value
			//if input matches english
			if (input === this.state.currentCard.english) {
				var i = this.state.index;
				var oldList = this.state.data; 
				oldList.splice(this.state.Index, 1)
				// console.log(oldList.length)
				this.setState ({
					data: oldList
				}, function (){
					this.getRandom()
				})
			}
		}
	},

	render: function() {
		return (
			<div>
			<h1>{this.props.id} </h1>
			{this.levelTwo()}
			</div>)
	}
}); 