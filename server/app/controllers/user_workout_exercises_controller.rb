class UserWorkoutExercisesController < ApplicationController
  before_action :require_login

  def show
    render json: user_workout.user_workout_exercises.to_json(include: :exercise)
  end

  def create
    user_workout_exercise = user_workout.user_workout_exercises.create!(
      exercise_id: user_workout_exercise_params["exercise_id"].to_i,
      weight: user_workout_exercise_params["weight"].to_i,
      reps: user_workout_exercise_params["reps"].to_i,
      sets: user_workout_exercise_params["sets"].to_i
    )

    render json: user_workout_exercise
  end

  private

  def user_workout
    @user_workout_exercise ||= current_user.user_workouts.find(user_workout_exercise_params["user_workout_id"])
  end

  def user_workout_exercise_params
    params.permit(:user_workout_id, :exercise_id, :weight, :reps, :sets)
  end
end