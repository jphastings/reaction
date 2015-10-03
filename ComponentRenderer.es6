import React from 'react';
import Path from 'path';
import components from './components/loader.es6'

class ComponentRenderer {
  render(componentName, state = {}) {
    const componentFactory = React.createFactory(components[componentName]);
    return React.renderToString(componentFactory(state));
  }
}

export default new ComponentRenderer();