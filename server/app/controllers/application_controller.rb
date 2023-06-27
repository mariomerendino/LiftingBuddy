class ApplicationController < ActionController::API
  private

  def token(user_id)
    payload = { user_id: user_id }
    JWT.encode(payload, hmac_secret, 'HS256')
  end

  def hmac_secret
    ENV['API_SECRET_KEY']
  end

  def client_has_valid_token?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by(auth_token: request.headers['Authorization'])
  end

  def require_login
    render json: {error: 'Unauthorized', valid_token: false}, status: :unauthorized if !client_has_valid_token?
  end
end
