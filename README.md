# Reaction

A proof-of-concept React component rendering service.

## Usage

1. `npm install && npm install webpack -g` (the latter is needed for the cli tool for webpack, I'll write a gulp script to do this in the future)
2. Create the compiled `ComponentRenderer.js` by running `webpack`
3. In `examples` You can now execute `bundle exec rackup` and visit http://localhost:9292/ :
  - A complete version of the page is rendered server-side by V8, usable by browsers without javascript
  - Browsers with js enabled will initialise client-side React, and new DOM changes will be made without calling the server.

## Things I'd like to do

- Use flux or an equivalent to propagate state changes backwards between components.