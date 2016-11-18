require 'action_cable'
require 'action_cable/engine'


module LiveoakCompat
  class Engine < Rails::Engine
    isolate_namespace LiveoakCompat

    initializer 'assets' do |app|
      app.config.assets.precompile += Dir.glob('**/*.{css,png,js}')
    end


  end
end
