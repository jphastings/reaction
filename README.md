# Reaction

A proof-of-concept React component rendering service.

## Usage

1. `npm install && npm install webpack -g` (the latter is needed for the cli tool for webpack, I'll write a gulp script to do this in the future)
2. Create the compiled `ComponentRenderer.js` by running `webpack`
3. In `examples` You can now:
  - execute `bundle exec ruby example.rb` and see a CommentBox being rendered with V8 from ruby
  - serve the directy (`ruby -run -ehttpd . -p8000` will do you) and see the DOM renderer take place.

## Things I'd like to do

- Use React-DOM to allow clientside rendering of the components