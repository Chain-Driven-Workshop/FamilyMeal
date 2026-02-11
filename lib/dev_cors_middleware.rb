class DevCorsMiddleware
  ALLOWED_ORIGIN = "http://localhost:5173".freeze

  def initialize(app)
    @app = app
  end

  def call(env)
    if env["REQUEST_METHOD"] == "OPTIONS"
      return [ 204, cors_headers(env["HTTP_ORIGIN"]), [] ]
    end

    status, headers, body = @app.call(env)
    origin = env["HTTP_ORIGIN"]
    if origin == ALLOWED_ORIGIN
      headers.merge!(cors_headers(origin))
    end
    [ status, headers, body ]
  end

  private

  def cors_headers(origin)
    {
      "Access-Control-Allow-Origin" => origin || ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods" => "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" => "Content-Type, Authorization",
      "Access-Control-Max-Age" => "1728000"
    }
  end
end
