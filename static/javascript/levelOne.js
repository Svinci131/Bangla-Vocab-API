var React = require('react');
var Router = require('director').Router;

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
	//Draw Current Card
	levelOne: function() {
		if (this.state.currentCard !== null) {
			if (this.state.data.length === 0) {
				return (<a href={"#levelTwo/"+this.props.id}>Level Two</a>)
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
						<div style={divStyle} className="levelOne_thumbnail"></div>)
				});
				console.log(urls)
				return (
				<div className="levelOne_word">
					<div className="levelOne_imgHolder">
						{images}
					</div>
					// <img src={""+this.state.currentCard.img}/>
					<p>{this.state.currentCard.english}</p>
					<p>{this.state.currentCard.bangla}</p>
					<input type="text" placeholder="type bangla" onKeyPress={this.getInput}
						id={this.state.currentCard.english}>
					</input>
				</div>)
			}
			
		}
	},
	//See if they wrote word correctly
	getInput:function (e) {
		//get input 
		if ( e.which === 13 ) {
			var input = e.target.value
			//if input matches english
			if (input === this.state.currentCard.bangla) {
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
			<div className="gamePlay">
			<h1>{this.props.id}: levelOne </h1>
			{this.levelOne()}
			</div>)
	}
})