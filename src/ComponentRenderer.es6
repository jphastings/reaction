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
    this.state = state;
    this.rerender();
  }

  rerender() {
    ReactDOM.render(this._componentFor(this.state), this.containerNode);
  }

  updateStateAndRerender(newState) {
    if (newState.react.partial) {
      delete newState.react.partial;
      this.state = this._mergeRecursive(this.state, newState);
    } else {
      this.state = newState;
    }
    this.rerender();
  }

  _componentFor(state) {
    const Component = this.components[state.react.component];
    const factory = React.createFactory(Component);
    return factory(state);
  }

  _mergeRecursive(oldObj, newObj) {
    for (const k in newObj) {
      try {
        if (typeof newObj[k] == 'object' ) {
          oldObj[k] = this._mergeRecursive(oldObj[k], newObj[k]);
        } else {
          oldObj[k] = newObj[k];
        }
      } catch(e) {
        oldObj[k] = newObj[k];
      }
    }
    return oldObj;
  }
}

export default new ComponentRenderer(components);