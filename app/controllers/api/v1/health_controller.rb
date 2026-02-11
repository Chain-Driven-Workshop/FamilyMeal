module Api
  module V1
    class HealthController < ApplicationController
      def show
        render json: { status: "ok", service: "recipe-api" }
      end
    end
  end
end
