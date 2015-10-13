import React from 'react';

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.name || 'Anonymous';
    return (
      <h1>Hello {name}</h1>
    );
  }
}

export default WelcomeHeader;