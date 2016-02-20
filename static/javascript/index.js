var Router = require('director').Router;
var React = require('react');
var imgObj = require('./dataWimagesNEW'); 
var ReactDOM = require('react-dom');
var Hello = require('./homePage');
var Test = require('./test');
//two pages home and play 
var routes = {

	'/home': function() {
		ReactDOM.render(
		  <Hello />,
		  document.getElementById('container')
		);
	},
	'/game/:id': function( id ) {
		console.log( id )
		ReactDOM.render(
		  <Game id={id} data={imgObj}/>,
		  document.getElementById('container')
		);
	},
	'/test/:id': function(id) {
		console.log( id )
		ReactDOM.render(
		  <Test id={id} data={imgObj}/>,
		  document.getElementById('container')
		);
	},
	'/levelThree': function() {
		ReactDOM.render(
		  <LevelThree />,
		  document.getElementById('container')
		);
	}
}

// console.log( routes, Router);

var router = Router( routes );
router.init('/home');


var LevelThree = React.createClass({
	render: function() {
		console.log("here")
		return (<div>
			<h1>level three</h1>
			</div>

	)}
});

var Game = React.createClass({
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
				return (<a href={"#test/"+this.props.id}>Level Two</a>)
			}
			else {
				return (
				<div>
					<img src={""+this.state.currentCard.img}/>
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
			<div>
			<h1>{this.props.id} </h1>
			{this.levelOne()}
			</div>)
	}
})


// ReactDOM.render(
//   <Hello data={data} />,
//   document.getElementById('container')
// );





// //click back button 
// //go back to home page 