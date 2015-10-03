import React from 'react';
import Path from 'path';
import components from './components/loader.es6'

class ComponentRenderer {
  render(componentName, state = {}) {
    return React.renderToString(this._componentFor(componentName, state));
  }

  renderInto(element, componentName, state = {}) {
    React.render(this._componentFor(componentName, state), element);
  }

  _componentFor(componentName, state) {
    const componentFactory = React.createFactory(components[componentName]);
    return componentFactory(state);
  }
}

export default new ComponentRenderer();