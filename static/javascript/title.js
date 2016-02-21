var React = require('react');
var BLetters = require('./bLetters');

module.exports = React.createClass ({
	titleCase: function (string) { 
			return string.charAt(0).toUpperCase() + string.slice(1)
		},
	render:function(){
		var title = this.titleCase(this.props.id)
		var titleObj = this.props.data[this.props.id][title];
		console.log(titleObj.bLetters)
		return(<div>
				<h1>{title}</h1>
				<BLetters data={titleObj} />
			</div>)
	}
		
});