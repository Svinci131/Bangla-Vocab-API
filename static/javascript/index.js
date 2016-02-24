var Router = require('director').Router;
var React = require('react');
var imgObj = require('./dataWimages_NEW'); 
var ReactDOM = require('react-dom');
var Home = require('./homePage');
var LevelOne = require('./levelOne');
var LevelTwo = require('./levelTwo');
var LevelThree = require('./levelThree')
//two pages home and play 


var routes = {
	'/home': function() {
		(console.log("foo"))
		ReactDOM.render(
		  <Home />,
		  document.getElementById('container')
		);
	},
	'/levelOne/:id': function( id ) {
		console.log( id, imgObj )
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
	'/levelThree/:id': function(id) {
		console.log(id)
		ReactDOM.render(
		  <LevelThree id={id} data={imgObj}/>,
		  document.getElementById('container')
		);
	}
}

// console.log( routes, Router);

var router = Router( routes );
router.init('/home');