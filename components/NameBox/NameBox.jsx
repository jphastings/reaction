import React from 'react';

class NameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };

    // http://stackoverflow.com/questions/29577977/react-ref-and-setstate-not-working-with-es6
    this._handleNameChange = this._handleNameChange.bind(this);
  }

  render() {
    const name = this.state.name;
    const message = name ? <p>Hi {name}, how splendid!</p> : '';
    return (
      <div>
        <form method="post" action="" onSubmit={this._handleNameChange}>
          <input type="text" name="name" defaultValue={name} placeholder="e.g. Bob" />
          <input type="submit" value="Change name" />
        </form>
        <p>I haven't yet implemented <a href="https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow">Flux</a> or an equivalent, so changing your name in this NameBox won't propagate that change to other components.</p>
        <p>The idea is that a client-side only 'dispatcher' collects state change events, alters the state and then selectively re-renders using <code>renderInto</code>. This logic would be duplicated by the fallback no-JS ruby endpoints this client-side JS overrides, so it must be kept simple.</p>
      </div>
    );
  }

  // Handlers

  _handleNameChange(event) {
    event.preventDefault();
    // this.setState({ name: event.target.value });
    const e = new CustomEvent(
      'rerender', {
        detail: {
          action: 'nameChange',
          name: event.target.name.value
        }
      }
    );
    window.dispatchEvent(e);
  }
}

NameBox.propTypes = {
  name: React.PropTypes.string
};

export default NameBox;