var Router = require('director').Router;
var React = require('react');
var ReactDOM = require('react-dom');
var imgObj = require('../json/dataWimages_NEW'); 
var alphaObj = require('../json/alphabet'); 
var Home = require('./homePage');
var LevelOne = require('./levelOne');
var LevelTwo = require('./levelTwo');
var LevelThree = require('./levelThree');
var Alpha = require('./alphabet');
var Menu = require('./menu');
//two pages home and play 


var routes = {
	'/home': function() {
		(console.log("foo"))
		ReactDOM.render(
		  <Home />,
		  document.getElementById('container')
		);
	},
	'/alphabet': function() {
		ReactDOM.render(
		  <Alpha data={alphaObj}/>,
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
	},	
}


// console.log( routes, Router);

var router = Router( routes );
router.init('/home');

ReactDOM.render(
	<Menu />,
	document.getElementById('menu')
);