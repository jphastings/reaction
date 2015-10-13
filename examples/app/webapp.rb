require 'sinatra/base'
require 'therubyracer'
require 'rack/accept'
require 'js_logger'
require 'stringio'
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
    end

    helpers do
      def accept
        env['rack-accept.request']
      end

      def react(component_name, state = {})
        (state[:component] ||= {})[:name] = component_name

        if accept.media_type?('text/html')
          rendered_content = settings.component_renderer.render(state)
          slim :base, locals: { content: rendered_content, state: state }
        elsif accept.media_type?('application/json')
          content_type :json
          state.to_json
        end
      end
    end

    get '/' do
      react :HomePage, user: { preferredName: session[:name] }
    end

    # controller calls

    post '/name' do
      session[:name] = params[:name]
      destination = URI.parse(request.referer)

      redirect destination.path
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
