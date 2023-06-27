class ExercisesController < ApplicationController
  def show
    if(exercises_params[:primary_muscle].nil?)
      exercises = Exercise.all
    else 
      exercises = Exercise.where("'#{exercises_params[:primary_muscle]}' = ANY (primary_muscles)")
    end
    render json: exercises.to_json
  end

  private

  def exercises_params
    params.permit(:primary_muscle)
  end
end