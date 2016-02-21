var React = require('react');
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
			showHint: false
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
				Index:index,
				showHint: false
			}, function() {
				var words = this.state.data.reduce(function( arr, currentItem) {
				arr.push( currentItem.english);
				return arr;
				}, []);
				console.log(words)
			});
	},
	onClick:function () {
		this.setState({ showHint: true });
	},
	//Draw card
	levelTwo: function() {

		if (this.state.currentCard !== null) {
			// console.log(this.state.currentCard.english)
			if (this.state.data.length === 0) {
				return (<a href="#levelThree">Level Three</a>)
			}
			else {
			return (
				<div className="levelTwo_word">
					<div className="levelTwo_textHolder">
						<p><em>Bangla: </em>{this.state.currentCard.bangla}</p>
						{ this.state.showHint ? <Hint data={this.state.currentCard}/> : null }
						<input type="text" placeholder="Type English" onKeyPress={this.getInput}
							id={this.state.currentCard.english}>
						</input>
						<button onClick={this.onClick} className="hint">hint</button>
					</div>
				</div>)
			}
		}
	},
	
	//See if they wrote word correctly
	getInput:function (e) {
		//get input 
		if ( e.which === 13 ) {
			var input = e.target.value
			input = input.toLowerCase();
			e.target.value = ""
			//if input matches english
			if (input === this.state.currentCard.english.toLowerCase() && this.state.showHint === false) {
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
			else {
				this.getRandom()
			}
		}
	},

	render: function() {
		return (
			<div className="gamePlay">
			<h1>{this.props.id}: levelOne </h1>
			<h4><em> Read the Bangla and enter English</em></h4>
			{this.levelTwo()}
			</div>)
	}
}); 

var Hint = React.createClass({
    render: function() {
        return (
            <div id="results" className="search-results">
                {this.props.data.english}
            </div>
        );
    }
});