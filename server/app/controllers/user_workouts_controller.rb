class UserWorkoutsController < ApplicationController
  def show
    require_login

    beginning_of_month = Date.new(user_workouts_params["year"].to_i, user_workouts_params["month"].to_i)
    end_of_month = beginning_of_month.end_of_month
    user_workouts = UserWorkout.
      where(user_id: current_user.id).
      where("workout_date BETWEEN ? AND ?", beginning_of_month, end_of_month)
    render json: user_workouts.to_json
  end

  private

  def user_workouts_params
    params.permit(:month, :year, :user_workout)
  end
end