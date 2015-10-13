import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CommentBox.scss';

@CSSModules(styles)
class CommentBox extends React.Component {
  render() {
    return (
      <div styleName="big-red">Hello, world! I am a CommentBox. I am big and red because I have styles.</div>
    );
  }
}

export default CommentBox;