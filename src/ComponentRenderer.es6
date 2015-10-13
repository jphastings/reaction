import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Path from 'path';
import components from '../components/loader.es6'

class ComponentRenderer {
  constructor(components) {
    this.components = components;
  }

  render(state) {
    return ReactDOMServer.renderToString(this._componentFor(state));
  }

  attachToElement(element, state) {
    this.containerNode = element;
    this.rerender(state);
  }

  rerender(state) {
    // TODO: This should not be needed! Why is reactDOM not picking up the change?
    this.containerNode.innerHTML = '';
    ReactDOM.render(this._componentFor(state), this.containerNode, () => {
      console.log("Render complete", state.user.preferredName)
    });
  }

  _componentFor(state) {
    const Component = this.components[state.component.name];
    const factory = React.createFactory(Component);
    console.log(factory(state))
    return factory(state);
  }
}

export default new ComponentRenderer(components);