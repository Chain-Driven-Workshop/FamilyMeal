Devise.setup do |config|
  config.navigational_formats = []

  config.jwt do |jwt|
    secret = if Rails.env.production? && !ENV['SECRET_KEY_BASE']
             'a_very_long_dummy_secret_at_least_64_chars_long_for_docker_build_purposes'
           else
             Rails.application.credentials.fetch(:secret_key_base)
           end
    jwt.secret = secret
    jwt.dispatch_requests = [
      [ "POST", %r{^/login$} ]
    ]
    jwt.revocation_requests = [
      [ "DELETE", %r{^/logout$} ]
    ]
    jwt.expiration_time = 30.minutes.to_i
  end
end
