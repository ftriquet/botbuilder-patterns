require 'sinatra'
require 'rack/parser'

class App < Sinatra::Base
  use Rack::Parser, content_type: {
    'application/json' => proc{ |body| JSON.parse(body) }
  }
  # We will receive webhook calls on this route if the user doesn't
  # confirm his name.
  post '/reset-user-name' do
    content_type :json

    # We get the memory in the request body
    memory = params['conversation']['memory']

    # Throw invalid information away
    memory.delete('user-name')
    memory.delete('user-name-confirmation')

    # Send back the new memory state
    { conversation: { memory: memory } }.to_json
  end
end

Rack::Handler.default.run(App, Port: 5000)
