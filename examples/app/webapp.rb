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
      v8['console'] = JSLogger.new
      v8.load(js_file)
      set :component_renderer, v8.eval('ComponentRenderer')
    end

    helpers do
      def react(component_name, state = {})
        (state[:component] ||= {})[:name] = component_name
        puts state.to_json
        component = settings.component_renderer.render(state)
        slim :base, locals: { content: component, state: state }
      end
    end

    get '/' do
      react :HomePage, user: { preferredName: params['name'] }
    end
  end
end
