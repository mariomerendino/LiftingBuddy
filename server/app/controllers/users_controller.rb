# Controller for creating users.
class UsersController < ApplicationController
  def create
    user = User.create!(username: user_params[:username], password: user_params[:password])
    render json: {
      username: user.username,
      token: token(user.id),
    }

  rescue ActiveRecord::RecordInvalid
    render json: { message: 'There was an error creating your User'}
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
