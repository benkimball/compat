require 'rails'
require 'action_cable'
require 'action_cable/engine'
require 'action_pack'
require 'action_controller'

module LiveoakCompat
  class Engine < ActionCable::Engine
    isolate_namespace LiveoakCompat

    initializer 'liveoak_compat.assets.precompile' do |app|
      app.config.assets.precompile += Dir.glob('**/*.{html,js}')

      # app.config.action_cable.allowed_request_origins = ['http://localhost:3000']
      app.middleware.use ::ActionDispatch::Static, "#{root}/lib"
    end


  end
end