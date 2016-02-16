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
		var listLength = (list.length)-1; 		
		var randomCard = list[Math.floor(Math.random()*(listLength - 0) + 0)];

		return {
			//Get the data object for that category - save as an array 
			data: list,
			//Get a random item
			currentCard: randomCard
		}
	},
	drawCard: function() {
		
		return (
			<div>
				<img src={""+this.state.currentCard.img}/>
				<p>{this.state.currentCard.english}</p>
				<p>{this.state.currentCard.bangla}</p>
				<input type="text" id={this.state.currentCard.english}>
				</input>
			</div>)
		// draw the card and the input field 
		
	},
	render: function() {
	
		// category[Object.keys(category)[Object.keys(category).length - 1]]
		return (
			<div>
			<h1>{this.props.id} </h1>
			{this.drawCard()}
			</div>)
	}
})


// ReactDOM.render(
//   <Hello data={data} />,
//   document.getElementById('container')
// );





// //click back button 
// //go back to home page 

