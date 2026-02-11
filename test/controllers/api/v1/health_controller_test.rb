require "test_helper"

module Api
  module V1
    class HealthControllerTest < ActionDispatch::IntegrationTest
      test "returns service health" do
        get "/api/v1/health"

        assert_response :success
        assert_equal({ "status" => "ok", "service" => "recipe-api" }, JSON.parse(response.body))
      end
    end
  end
end
