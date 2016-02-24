var React = require('react');
var BLetters = require('./bLetters');
var Title = require('./title');
var Hint = require('./hint');


module.exports = React.createClass({
	//Get the data object for that category - save as an array 
	//set state for object arr and current card
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
				console.log("remaining", words)
			});
	},
	//set hint to true
	onClick:function () {
		this.setState({ showHint: true });
	},
	//Draw Current Card
	drawQuestion: function() {
		if (this.state.currentCard !== null) {
			if (this.state.data.length === 0) {
				return (<h2> Congrats! </h2> )
			}
			else {
				var imgObj = this.state.currentCard.img;
				var urls = Object.keys(imgObj).reduce(function( arr, currentItem) {
					arr.push( imgObj[currentItem]);
					return arr;
				}, []);
				urls = urls.splice(0,3)
				// console.log(images)
				var images = urls.map (function (el){
					var divStyle = {
						backgroundImage: 'url(' + el + ')',
					}
					return (
						<div style={divStyle} className="twoCol_thumbnail"></div>)
				});
				// console.log(urls)
				return (
				<div className="ui two column centered grid">
					<div className="column">
						{images}
					</div>
					<div className="column">
						<p><em>English: </em> {this.state.currentCard.english}</p>
						{ this.state.showHint ? <Hint data={this.state.currentCard.bangla}/> : null }
						<div className="ui input">
 						 <input onKeyPress={this.getInput} type="text" placeholder="Enter Bengali Pronuciation" />
						</div>

						<button onClick={this.onClick} className="hint ui button">hint</button>
					
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
			if (input === this.state.currentCard.bangla.toLowerCase()) {
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
			<div>
			<Title id={this.props.id} data={this.props.data}/>
			{this.drawQuestion()}
			</div>)
	}
})