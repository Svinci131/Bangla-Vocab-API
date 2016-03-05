var React = require('react');
var BLetters = require('./bLetters');
var Title = require('./title');

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
			score: { total: list.length,
					  completed: 0
					},
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
			// console.log( this.state.data[ index ])
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
		// console.log( this.state )
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


				return (
				<div className="ui two column centered grid">
					<div className="column">
						{images}
					</div>
					<div className="column">
						<p><em>English: </em> {this.state.currentCard.english}</p>
						<p><em>Bangla: </em>{this.state.currentCard.bangla}</p>
						<BLetters data={this.state.currentCard} />
						<div className="ui input">
 						 <input onKeyPress={this.getInput} type="text" placeholder="Enter Bengali Pronuciation" />
						</div>
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
				oldList.splice(this.state.Index, 1);
				
				var newScore = this.state.score.completed + 1;
				var total = this.state.score.total;
				// console.log(oldList.length)
				this.setState ({
					data: oldList,
					score: { total: total,
					  		  completed: newScore
					},
				}, function () {
					this.getRandom()
				})
			}
			else {
				this.getRandom()
			}
		}
	},

	render: function() {
		// console.log("here", this.state.score.total)
		return (
			<div>
				<Title id={this.props.id} score={this.state.score} data={this.props.data}/>
				{this.levelOne()}
			</div>

			)
	}
})



// <div className="ui indicating progress">
// 				  <div className="bar"></div>
// 				</div>

		
