//split- if it's longer than three words
//loopthrough the and make dictionary calls 
//if one of them is a verb, return <span underline 
var React = require('react');

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
		console.log("foo")
		console.log(document.getElementById("sidebar"))
	},
	render: function() {
		 return (
		  <div>

		 	<div id="sidebar" className="ui simple sidebar inverted vertical menu">
		      <a className="item">
		        1
		      </a>
		      <a className="item">
		        2
		      </a>
		      <a className="item">
		        3
		      </a>
	    	</div>

			<div className="ui fixed inverted menu">
				<div className="ui container">
					<a onClick={this.showSideBar} className="launch icon item">
					<i className="content icon"></i>
					</a>
					<a href="#home" className="header item">
						Learn Bangla বাংলা শেখা
					</a>
					<a href="#alphabet" className="computer-only item">
						Alphabet
					</a>
				</div>
			</div>

	      </div>
		)
	}
});