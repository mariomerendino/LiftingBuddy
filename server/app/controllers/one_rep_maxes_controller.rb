class OneRepMaxesController < ApplicationController 
  before_action :require_login
  BENCH_PRESS_ID = 44
  SQUAT_ID = 64
  DEADLIFT_ID = 47

  def show
    data = {
      bench: get_daily_one_rep_maxes(BENCH_PRESS_ID),
      squat: get_daily_one_rep_maxes(SQUAT_ID),
      deadlift: get_daily_one_rep_maxes(DEADLIFT_ID),
    }

    render json: data
  end

  private

  def get_daily_one_rep_maxes(exercise_id)
    exercises = current_user.user_workout_exercises.where(exercise_id: exercise_id).order(:workout_date)
    daily_one_rep_maxes = {}
    
    exercises.each do |exercise|
      user_workout = exercise.user_workout
      max = one_rep_max(exercise.weight, exercise.reps)
      if(daily_one_rep_maxes[user_workout.workout_date].nil? || daily_one_rep_maxes[user_workout.workout_date] < max)
        daily_one_rep_maxes[user_workout.workout_date] = max
      end
    end
    
    return {
      labels: daily_one_rep_maxes.keys,
      data: daily_one_rep_maxes.values,
    }
  end

  def one_rep_max(weight, reps)
    weight * (1 + ((reps * 1.0) / 30))
  end
end
