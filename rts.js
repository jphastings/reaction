const Express = require('express');
const BodyParser = require('body-parser')
const React = require('react');
const fs = require('fs');
const path = require('path');

const componentFactories = {}
fs.readdirSync('components').map(componentName => {
  try {
    const component = require(path.join(__dirname, 'components', componentName, 'component'));
    componentFactories[componentName] = React.createFactory(component);
    console.info('Loaded component: ' + componentName);
  } catch(e) {
    console.warn('Could not load component: ' + componentName);
  }
});

const app = Express();
app.use(BodyParser.json())

app.post('/components/*', (req, res) => {
  const state = req.body;
  const componentFactory = componentFactories[req.params[0]];
  if (typeof componentFactory === 'undefined') {
    res.status(404);
  } else {
    res.send(React.renderToString(componentFactory(state)));
  }
});

const server = app.listen(3300, () => {
  const s = server.address();
  console.log('Reaction render server listening at http://%s:%s', s.address, s.port);
});