$LOAD_PATH.unshift('lib', 'app')
require File.join(File.dirname(__FILE__), 'app/webapp.rb')

run Reaction::WebApp