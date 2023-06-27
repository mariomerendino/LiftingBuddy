# Handles logging into the rails app.
class LoginsController < ApplicationController
  def create
    # look up user
    user = User.find_by(username: user_params[:username])

    # if provided password is equal to that users password, log them in and set the auth token
    if user&.authenticate(user_params[:password])
      if user.auth_token.nil?
        token = token(user.id)
        user.auth_token = token
        user.save!
      end

      render json: { token: user.auth_token, user_id: user.id }, status: :created
    else
      render json: { errors: ['Sorry, incorrect username or password'] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
