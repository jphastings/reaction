import React, { PropTypes } from 'react';
import NameBox from '../NameBox';
import WelcomeHeader from '../WelcomeHeader';

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <WelcomeHeader name={this.props.user.preferredName} />
        <NameBox name={this.props.user.preferredName} />
      </div>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.shape({
    preferredName: PropTypes.string
  })
}

export default HomePage;