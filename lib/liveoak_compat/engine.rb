# require 'rails'
# require 'action_cable'
require 'action_cable/engine'
require 'action_pack'
require 'action_controller'

require_relative '../../app/controllers/liveoak_compat/application_controller'
require_relative '../../app/controllers/liveoak_compat/runs_controller'

module LiveoakCompat
  class Engine < ::ActionCable::Engine
    isolate_namespace LiveoakCompat

    initializer 'assets' do |app|
      Rails.application.config.assets.precompile += Dir.glob('**/*.{css,png,js}')
    end


  end
end

