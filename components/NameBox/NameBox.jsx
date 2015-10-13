import React, { PropTypes } from 'react';
import ClientSideHelpers from '../../src/ClientSideHelpers.es6'

class NameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      suggestions: []
    };

    this._handleChooseSelection = this._handleChooseSelection.bind(this);
  }

  render() {
    return (
      <div>
        <form ref="form" action="/name" method="post" className="form-inline" onSubmit={ClientSideHelpers.handleFormSubmitClientSide}>
          <input name="name" autoComplete="off" type="text" className="form-control" value={this.state.name} onChange={this._handleFieldChange.bind(this)} placeholder="e.g. Bob" />
          <button type="submit" className="btn btn-default">Change Name</button>
        </form>
        <div className="">
          <ul className="">
            {this.state.suggestions.map(suggestedName => {
              return <li key={suggestedName}><a href="" onClick={this._handleChooseSelection}>{suggestedName}</a></li>
            })}
          </ul>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  // Handlers

  _handleFieldChange(event) {
    const partial = event.target.value;
    this.setState({ name: partial });

    fetch('/api/suggestions/names?partial=' + partial)
      .then(res => res.json())
      .then(json => {
        this.setState({ suggestions: json });
      });
  }

  _handleChooseSelection(event) {
    event.preventDefault();
    this.setState({ name: event.target.text }, () => {
      ClientSideHelpers.handleFormSubmitClientSide(this.refs.form, false);
    });
  }
}

NameBox.propTypes = {
  name: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string)
};

export default NameBox;
