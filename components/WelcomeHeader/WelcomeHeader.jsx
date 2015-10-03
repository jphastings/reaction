import React from 'react';

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.preferredName };
  }

  render() {
    const name = this.state.name || 'Anonymous';
    return (
      <h1>Hello {name}</h1>
    );
  }
}

export default WelcomeHeader;