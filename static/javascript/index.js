var Router = require('director').Router;
var React = require('react');
var imgObj = require('./dataWimages'); 
var ReactDOM = require('react-dom');
var Hello = require('./homePage');
var LevelOne = require('./levelOne');
var LevelTwo = require('./levelTwo');
var LevelThree = require('./levelThree')
//two pages home and play 


var routes = {
	'/home': function() {
		ReactDOM.render(
		  <Hello />,
		  document.getElementById('container')
		);
	},
	'/levelOne/:id': function( id ) {
		console.log( id )
		ReactDOM.render(
		  <LevelOne id={id} data={imgObj}/>,
		  document.getElementById('container')
		);
	},
	'/levelTwo/:id': function(id) {
		console.log( id )
		ReactDOM.render(
		  <LevelTwo id={id} data={imgObj}/>,
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