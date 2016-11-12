var React = require('react');
var imgObj = require('../json/dataWimages_NEW'); 
var data = Object.keys(imgObj).reduce(function( arr, currentItem) {
			arr.push( currentItem);
			return arr;
	}, []);

module.exports = React.createClass({
	componentDidMount: function () {
        document.body.addEventListener('click', this.myHandler);
    },
    componentDidUnmount: function () {
        document.body.removeEventListener('click', this.myHandler);
    },
    myHandler: function () {
        var sidebarVisibility = document.getElementById("sidebar").style.visibility
        if (sidebarVisibility === "initial"){
        	document.getElementById("sidebar").style.visibility = "hidden"
        }
    },
	showSideBar: function () {
		document.getElementById("sidebar").style.visibility = "initial"
	},
	render: function() {
		var items = data.map(function(title) {
			return (<a href={"#levelOne/"+ title.split(' ')[0].toLowerCase()} className="item">
		        {title}
		      </a>)
		});
		 return (
		  <div>
		 	<div id="sidebar" className="ui simple sidebar inverted vertical menu">
		      {items}
	    	</div>

			<div className="ui fixed inverted menu">
				<div className="ui container">
					<a onClick={this.showSideBar} className="phone-only launch icon item">
						<i className="content icon"></i>
					</a>
					<a href="#home" className="header item">
						Learn Bangla বাংলা শেখা
					</a>
					<a href="#alphabet" className="computer-only item">
						Alphabet
					</a>
					<a href="#login" className="computer-only item">
						Login
					</a>
				</div>
			</div>
	      </div>
		)
	}
});