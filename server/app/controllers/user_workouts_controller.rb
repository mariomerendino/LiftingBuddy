class UserWorkoutsController < ApplicationController
  before_action :require_login

  def show
    beginning_of_month = Date.new(user_workouts_params["year"].to_i, user_workouts_params["month"].to_i)
    end_of_month = beginning_of_month.end_of_month
    user_workouts = UserWorkout.
      where(user_id: current_user.id).
      where("workout_date BETWEEN ? AND ?", beginning_of_month, end_of_month)

    render json: user_workouts.to_json(include: :user_workout_exercises)
  end

  def create
    date = Date.new(
      user_workouts_params["year"].to_i,
      user_workouts_params["month"].to_i,
      user_workouts_params["day"].to_i
    )
    user_workout = current_user.user_workouts.where(workout_date: date).first_or_create

    render json: user_workout.to_json
  end

  private

  def user_workouts_params
    params.permit(:month, :year, :day, :user_workout)
  end
end