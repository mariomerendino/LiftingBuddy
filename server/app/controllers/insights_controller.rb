class InsightsController < ApplicationController
  before_action :require_login
  def show
    render json: {
      average_days_per_week: average_days_per_week,
      ai_recommendation: ai_recommendation 
    }
  end

  private

  def average_days_per_week
    workout_weeks = current_user.user_workouts.map { |x| x.workout_date.strftime("%U").to_i }
    week_counts = workout_weeks.each_with_object({}) do |week, obj|
      obj[week].nil? ? obj[week] = 1 : obj[week]+=1
    end

    return week_counts.values.sum / week_counts.values.length
  end

  def ai_recommendation
    ""
  end
end