const React = require('react');
const CommentBox = require('../comment_box/component');
const WelcomeHeader = require('../welcome_header/component');

module.exports = React.createClass({
  propTypes: {
    preferredName: React.PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement('div', {className: "commentBox"},
      [
        React.createElement(WelcomeHeader, this.props),
        React.createElement(CommentBox, this.props)
      ]
    );
  }
});