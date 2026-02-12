module Api
  module V1
    class AuthController < ApplicationController
      before_action :authenticate_user!

      def show
        render json: {
          data: {
            id: current_user.id,
            email: current_user.email,
            created_at: current_user.created_at
          }
        }, status: :ok
      end
    end
  end
end
