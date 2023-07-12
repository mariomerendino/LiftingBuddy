class ApplicationController < ActionController::API
  private
  def hmac_secret
    ENV['API_SECRET_KEY']
  end

  def token(user_id)
    payload = { user_id: user_id }
    JWT.encode(payload, hmac_secret, 'HS256')
  end

  def curr_token
    request.headers['Authorization']
  end

  def decode_token(token)
    JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
  end

  def client_has_valid_token?
    decode_token(curr_token)
    return true
  rescue
    return false
  end

  def current_user
    @current_user ||= begin
      decoded_token = decode_token(curr_token)
      user_id = decoded_token[0]["user_id"]
      User.find_by(id: user_id)
    end
  end

  def require_login
    render json: {error: 'Unauthorized', valid_token: false}, status: :unauthorized if !client_has_valid_token?
  end
end
