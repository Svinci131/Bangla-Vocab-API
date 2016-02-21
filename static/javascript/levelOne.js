var React = require('react');
var Router = require('director').Router;
var Entities = require('html-entities').AllHtmlEntities;

module.exports = React.createClass({
	//Get the data object for that category - save as an array 
	//set state for object arr and current card
	getInitialState: function() {
		var category = this.props.data[this.props.id];
		var list = Object.keys(category).reduce(function(arr, currentItem) {
			arr.push( category[currentItem]);
			return arr;
		}, []);
			
		return {
			//Get the data object for that category - save as an array 
			data: list,
			currentCard: null,
			Index: null,
		}
	},
	
	componentDidMount:function () {
		this.getRandom()
	}, 
	//Get a random item and set current card to that item 
	getRandom:function (){
		var listLength = (this.state.data.length)-1; 
			var index =	Math.floor(Math.random()*(listLength));
			this.setState({
				currentCard: this.state.data[index], 
				Index:index
			}, function() {
				var words = this.state.data.reduce(function( arr, currentItem) {
				arr.push( currentItem.english);
				return arr;
				}, []);
				// console.log("remaining", words)
			});
	},
	//Draw Current Card
	levelOne: function() {
		if (this.state.currentCard !== null) {
			if (this.state.data.length === 0) {
				return (<a href={"#levelTwo/"+this.props.id}>Level Two</a>)
			}
			else {
				var imgObj = this.state.currentCard.img;
				var urls = Object.keys(imgObj).reduce(function( arr, currentItem) {
					arr.push( imgObj[currentItem]);
					return arr;
				}, []);
				urls = urls.splice(0,3)
				// console.log(images)
				var images = urls.map (function (el){
					var divStyle = {
						backgroundImage: 'url(' + el + ')',
					}
					return (
						<div style={divStyle} className="twoCol_thumbnail"></div>)
				});
				// console.log(urls)
				return (
				<div className="twoCol_wrapper">
					<div className="twoCol_imgWrapper">
						{images}
					</div>
					<div className="twoCol_textWrapper">
						<p><em>Enlish: </em> {this.state.currentCard.english}</p>
						<p><em>Bangla: </em>{this.state.currentCard.bangla}</p>
						<BLetters data={this.state.currentCard} />
						<input type="text" placeholder="type bangla" onKeyPress={this.getInput}
							id={this.state.currentCard.english}>
						</input>
					</div>
				</div>)
			}
			
		}
	},
	//See if they wrote word correctly
	getInput:function (e) {
		//get input 
		if ( e.which === 13 ) {
			var input = e.target.value
			input = input.toLowerCase();
			e.target.value = ""
			//if input matches english
			if (input === this.state.currentCard.bangla.toLowerCase()) {
				var i = this.state.index;
				var oldList = this.state.data; 
				oldList.splice(this.state.Index, 1)
				// console.log(oldList.length)
				this.setState ({
					data: oldList
				}, function (){
					this.getRandom()
				})
			}
			else {
				this.getRandom()
			}
		}
	},

	render: function() {
		function titleCase(string) { 
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
		var title = titleCase(this.props.id)
		var titleObj = this.props.data[this.props.id][title];
		var Char = String.fromCharCode;
		var hexEntities=titleObj.bLetters;
		hexEntities = hexEntities.split(";");
		hexEntities = hexEntities.slice(0, hexEntities.length-1)

		entities = new Entities();
 		console.log("before", hexEntities)
 		var arr = hexEntities.reduce(function(arr, curr){
 			var Char = entities.decode(""+curr+";")
 			arr.push( Char);
			return arr;
		}, []);

 		var bLetters = arr.join(" ")
 		console.log("after", bLetters)
 // &lt;&gt;&quot;&amp;&copy;&reg;∆ 
// console.log(entities.encodeNonUTF('<>"&©®∆')); // &lt;&gt;&quot;&amp;&copy;&reg;&#8710; 
// console.log(entities.encodeNonASCII('<>"&©®∆')); // <>"&©®&#8710; 
// console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;')); // <>"&©® 
// console.log("here",entities.decode(""+hexEntities[0]+";")); // <>"&©® 

		return (
			<div className="gamePlay">
			<h1>{this.props.id}: Level One {bLetters}</h1>
			{this.levelOne()}
			
			<a  className="back" href="/#home">Back</a>
			</div>)
	}
})

var BLetters = React.createClass({
	convertFromHex: function () {
		var hexEntities = this.props.data.bLetters; 
		hexEntities = hexEntities.split(";");
		hexEntities = hexEntities.slice(0, hexEntities.length-1)
		entities = new Entities();
		var arr = hexEntities.reduce(function(arr, curr){
 			var Char = entities.decode(""+curr+";")
 			arr.push( Char);
			return arr;
		}, []);

 		var bLetters = arr.join(" ")

 		return (<p>{bLetters}</p>)

	},
    render: function() {
        return (
            <div id="results" className="search-results">
                <p>{this.props.data.bLetters}</p>
                {this.convertFromHex()}
            </div>
        );
    }
});
