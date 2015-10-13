import React, { PropTypes } from 'react';

class WelcomeHeader extends React.Component {
  render() {
    return (
      <h1>Hello {this.props.name || 'you'}</h1>
    );
  }
}

WelcomeHeader.propTypes = { name: PropTypes.string };

export default WelcomeHeader;