import React, { PropTypes } from 'react';
import CommentBox from '../CommentBox';
import WelcomeHeader from '../WelcomeHeader';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <WelcomeHeader />
        <CommentBox />
      </div>
    );
  }
}

HomePage.propTypes = {
  preferredName: PropTypes.string.isRequired
}

export default HomePage;