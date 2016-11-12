var React = require('react');
var post = require("../utils").makeTestPostRequest;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			userName: null,
			password: null
		}
	},
	render: function () {
		return (<form class="navbar-form pull-left">
		  <input type="text" onKeyPress={this.setUserName} placeholder="username" class="span2"/>
		  <input type="text"  onKeyPress={this.passWord} placeholder="password" class="span2"/>
		  <button type="submit" onClick={this.login} class="btn">Submit</button>
		</form>)
	},
	setUserName: function (e) {
		this.setState ({
			userName: e.target.value
		});
	},
	setPassWord: function (e) {
		this.setState ({
			password: e.target.value
		});
	},
	login: function () {
		// let data = {
		// 	name: this.state.userName,
		// 	pword: this.state.pword
		// }
		// post(data, '/users');
		post();
		//console.log("here", post)
	}
});