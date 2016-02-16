var Router = require('director').Router;
var React = require('react');
var imgObj = require('./dataWimagesNEW'); 
var ReactDOM = require('react-dom');
var Hello = require('./homePage');
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
		  <Game id={id} />,
		  document.getElementById('container')
		);
	},
}

// console.log( routes, Router);

var router = Router( routes );
router.init('/home');

var Game = React.createClass({
	getInitialState: function() {
		var category = imgObj[this.props.id];
		var list = Object.keys(category).reduce(function(arr, currentItem) {
			arr.push( category[currentItem]);
			return arr;
		}, []);
			
		return {
			//Get the data object for that category - save as an array 
			data: list,
			currentCard: null,
			Index: null,
			//Determine (level one two or three)
			level: 1
		}
	},
	//Get a random item 
	componentDidMount:function () {
		this.getRandom()
	}, 
	getRandom:function (){
		var listLength = (this.state.data.length)-1; 
		var index =	Math.floor(Math.random()*(listLength));
		console.log(index)
		this.setState({
			currentCard: this.state.data[index], 
			Index:index
		}, function() {
			console.log("here",this.state.currentCard, index, this.state.data)
		
			});
	},
	levelOne: function() {
		if (this.state.currentCard !== null) {
			return (
			<div>
				<img src={""+this.state.currentCard.img}/>
				<p>{this.state.currentCard.english}</p>
				<p>{this.state.currentCard.bangla}</p>
				<input type="text" onKeyPress={this.getInput}
					id={this.state.currentCard.english}>
				</input>
			</div>)
		}
	},
	drawCard:function() {
		//determine level

	},
	getInput:function (e) {
		//get input 
		if ( e.which === 13 ) {
			var input = e.target.value
			//if input matches english
			if (input === this.state.currentCard.bangla) {
				console.log("correct")
				var i = this.state.index;
				var oldList = this.state.data 
				this.setState ({
					data: oldList.splice(this.state.index, 1)
				}, function (){
					this.getRandom()
				})
			}
		}
		
		//data.state = data.splice(list[index])
		//this.getRandom()
	},
	render: function() {
	
		// category[Object.keys(category)[Object.keys(category).length - 1]]
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

