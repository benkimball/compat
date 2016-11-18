# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
module LiveoakCompat

  class EchoChannel < ApplicationCable::Channel
    def subscribed
      stream_from "echo"
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end

    def echo(data)
      ActionCable.server.broadcast "echo", data["message"]
    end
  end
end
