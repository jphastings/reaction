const React = require('react');

module.exports = React.createClass({
  render: function() {
    return React.createElement('div', {className: "commentBox"},
      "Hello, world! I am a CommentBox."
    );
  },
});