require_dependency 'liveoak_compat/application_controller'

module LiveoakCompat
  class RunsController < ApplicationController
    def new
      puts 'lol'
      render 'liveoak_compat/runs/new'
    end

    def create
    end
  end
end
