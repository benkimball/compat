require 'rails'
require 'action_cable'
require 'action_cable/engine'
require 'action_pack'
require 'action_controller'

require_relative '../../app/controllers/application_controller'
require_relative '../../app/controllers/runs_controller'

module LiveoakCompat
  class Engine < ActionCable::Engine
    isolate_namespace LiveoakCompat

    initializer 'liveoak-compat.assets.precompile' do |app|
      app.config.assets.precompile += Dir.glob('**/*.{html,js}')

      # app.config.action_cable.allowed_request_origins = ['http://localhost:3000']
      app.middleware.use ::ActionDispatch::Static, "#{root}/lib"
    end


  end
end

# Register the engine routes to allow this to become a gem and imported in other repositories
LiveoakCompat::Engine.routes.draw do
  root 'runs#new'
  get 'runs/new'
  get 'runs/create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end