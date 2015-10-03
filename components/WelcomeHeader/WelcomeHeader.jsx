import React from 'react';

class WelcomeHeader extends React.Component {
  render() {
    return (
      <h1>Hello {this.props.preferredName}</h1>
    );
  }
}

export default WelcomeHeader;