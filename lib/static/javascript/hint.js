var React = require('react');
var Router = require('director').Router;


module.exports = React.createClass({
    render: function() {
        return (
            <div id="results" className="search-results">
                {this.props.data}
            </div>
        );
    }
});