const React = require('react');

module.exports = React.createClass({
  propTypes: {
    preferredName: React.PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement('h1', {className: "welcomeHeader"},
      "Hello " + this.props.preferredName
    );
  },
});