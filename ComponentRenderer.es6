import React from 'react';
import Path from 'path';
import components from './components/loader.es6'

class ComponentRenderer {
  render(state) {
    return React.renderToString(this._componentFor(state));
  }

  attachToElement(element, state) {
    this.stateStore = state;
    this.reactElement = element;
    window.addEventListener('rerender', this._handleEvent.bind(this));
    this._renderInto(this.reactElement, this.stateStore);
  }

  _renderInto(element, state) {
    React.render(this._componentFor(state), element, () => {
      console.log("Render complete", state)
    });
  }

  _componentFor(state) {
    const componentFactory = React.createFactory(components[state.component.name]);
    return componentFactory(state);
  }

  _handleEvent(event) {
    const d = event.detail;
    switch (d.action) {
      case 'nameChange':
        this.stateStore.user.preferredName = d.name;
        break;
      default:
        console.error('Event not implemented: ' + event.details.action);
    }
    this._renderInto(this.reactElement, this.stateStore);
  }
}

export default new ComponentRenderer();