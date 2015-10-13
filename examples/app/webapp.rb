require 'sinatra/base'
require 'therubyracer'
require 'rack/accept'
require 'js_logger'
require 'json'
require 'slim'

module Reaction
  class WebApp < Sinatra::Base
    use Rack::Accept

    set :root, File.join(__dir__, '..')

    configure do
      enable :sessions
      js_file = File.join(__dir__, '../public/js/ComponentRenderer.js')
      v8 = V8::Context.new
      v8['console'] = JSLogger.new
      v8.load(js_file)
      set :component_renderer, v8.eval('ComponentRenderer')
      set :names, File.read(File.join(__dir__, '../ext/names.txt')).split("\n")

      set :stored_name, nil
    end

    helpers do
      def react(component_name, state = {})
        (state[:component] ||= {})[:name] = component_name
        rendered_content = settings.component_renderer.render(state)
        slim :base, locals: { content: rendered_content, state: state }
      end

      def accept
        env['rack-accept.request']
      end
    end

    get '/' do
      react :HomePage, user: { preferredName: settings.stored_name }
    end

    # controller calls

    post '/name' do
      settings.stored_name = params[:name]
      destination = URI.parse(request.referer)

      if accept.media_type?('text/html')
        redirect destination.path
      elsif accept.media_type?('application/json')
        content_type :json
        {
          user: { preferredName: settings.stored_name },
          component: { name: :HomePage }
        }.to_json
      end
    end

    # Stateless API calls

    get '/api/suggestions/names', provides: :json do
      count = 5
      string = params[:partial].scan(/^[a-z]+/i).first rescue nil
      suggestions = string.nil? ?
        [] :
        settings.names.lazy.select { |name| name.match(/^#{string}/i) }.take(5).to_a

      suggestions.to_json
    end
  end
end
