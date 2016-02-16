var Router = require('director').Router;
var React = require('react');
var ReactDOM = require('react-dom');
var imgObj = require('./dataWimagesNEW'); 
var data = imgObj;

var Hello = require('./hello');

var routes = {
	'/home': function() {
		ReactDOM.render(
		  <Hello />,
		  document.getElementById('container')
		);
	},
	'/foo/:id': function( id ) {
		console.log( id )
		ReactDOM.render(
		  <Foo id={id} />,
		  document.getElementById('container')
		);
	}
}

console.log( routes, Router);

var router = Router( routes );
router.init('/home');

var Foo = React.createClass({
	render: function() {
		return (<h1>Hello, Wrold! {this.props.id} </h1>)
	}
})


// var Hello = React.createClass({
//   render: function() {
//     return <div>
//     <h1>Learn Bangla</h1>
//     	<HomePage />
//     </div>;
//   }
// });

// var HomePage = React.createClass({
//   loadCategory: function (event) {
//   	console.log('foo')
//   },
//   render: function() {
//   	var categories = Object.keys(data).reduce(function( arr, currentItem) {
// 			arr.push( currentItem);
// 			return arr;
// 	}, []);

//   	var categoryButtons = categories.map(function(title) {
//   		return (
// 			<button onClick={function(e) {
// 				console.log(e.target}
// 				} key={title}>
// 	          {title}
// 	        </button>
// 	      );
//   	});
//     return (
//      <div> {categoryButtons} </div>
//     );
//   }
// });

// ReactDOM.render(
//   <Hello data={data} />,
//   document.getElementById('container')
// );




// //two pages- home and gamePlay 

// //home 
// //Create buttons for each category 
//onclick change

// //Click a button 
// //remove buttons
// //load flascards
// //load back button 

// //click back button 
// //go back to home page 

