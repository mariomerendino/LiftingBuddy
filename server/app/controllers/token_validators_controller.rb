class TokenValidatorsController < ApplicationController
  def show
    if client_has_valid_token?
      render json: { valid_token: true }
    else
      require_login
    end
  end
end