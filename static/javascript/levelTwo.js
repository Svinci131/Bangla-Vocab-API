var React = require('react');
var BLetters = require('./bLetters');
var Title = require('./title');
var Hint = require('./hint');

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
			score: { total: list.length,
					  completed: 0
					},
			currentCard: null,
			Index: null,
			showHint: false,
			
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
	//set hint to true
	onClick:function () {
		this.setState({ showHint: true });
	},
	//Draw card
	levelTwo: function() {

		if (this.state.currentCard !== null) {
			// console.log(this.state.currentCard.english)
			if (this.state.data.length === 0) {
				return (<a href={"#levelThree/"+this.props.id}>Level Three</a>)
			}
			else {
			return (
				<div>
					<div>
						<p><em>Bangla: </em>{this.state.currentCard.bangla}</p>
						
					<BLetters data={this.state.currentCard} />
						
						{ this.state.showHint ? <Hint data={this.state.currentCard.english}/> : null }
						
						<div className="ui input">
 						 <input onKeyPress={this.getInput} type="text" placeholder="Enter English" />
						</div>
						<button onClick={this.onClick} className="ui right floated button">Hint</button>
						
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
				var newScore = this.state.score.completed + 1;
				var total = this.state.score.total;
				// console.log(oldList.length)
				this.setState ({
					data: oldList,
					score: { total: total,
					  		  completed: newScore
					},
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
			<div>
			<Title id={this.props.id} score={this.state.score} data={this.props.data}/>
			{this.levelTwo()}
			</div>)
	}
}); 

