require 'sinatra/base'
require 'therubyracer'
require 'js_logger'
require 'json'

module Reaction
  class WebApp < Sinatra::Base
    set :root, File.join(__dir__, '..')

    configure do
      js_file = File.join(__dir__, '../public/js/ComponentRenderer.js')
      v8 = V8::Context.new
      v8['console'] = JSLogger.new if development?
      v8.load(js_file)
      set :component_renderer, v8.eval('ComponentRenderer')
    end

    helpers do
      def react(component_name, state = {})
        component = settings.component_renderer.render(component_name, state)
        slim :base, locals: { content: component, init: { component: component_name, state: state } }
      end
    end

    get '/' do
      react :HomePage, preferredName: 'JP'
    end
  end
end
