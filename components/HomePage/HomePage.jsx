import React, { PropTypes } from 'react';
import NameBox from '../NameBox';
import WelcomeHeader from '../WelcomeHeader';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <WelcomeHeader preferredName={this.props.preferredName} />
        <NameBox name={this.props.preferredName} />
      </div>
    );
  }
}

HomePage.propTypes = {
  preferredName: PropTypes.string.isRequired
}

export default HomePage;