var React = require('react');
var ReactDOM = require('react-dom');
var imgObj = require('./dataWimagesNEW'); 
var data = imgObj;
// var data = Object.keys( imgObj).reduce(function( arr, currentItem) {
// 	arr.push( imgObj[ currentItem ] );
// 	return arr;
// }, []);


// console.log( data );
// <CardPage data={this.props.data}/>
// var data = [
//   {id: 1, author: "Pete Hunt", text: "This is one comment"},
//   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
// ];


var Hello = React.createClass({
  render: function() {
    return <div>
    <h1>Learn Bangla</h1>
    	<HomePage />
    </div>;
  }
});

var HomePage = React.createClass({
  loadCategory: function (event) {
  	console.log('foo')
  },
  render: function() {
  	var categories = Object.keys(data).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

  	var categoryButtons = categories.map(function(title) {
  		return (
			<button onClick={function(e) {
				console.log(e.target}
				} key={title}>
	          {title}
	        </button>
	      );
  	});
    return (
     <div> {categoryButtons} </div>
    );
  }
});

ReactDOM.render(
  <Hello data={data} />,
  document.getElementById('container')
);




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

