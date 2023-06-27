class UserWorkout < ApplicationRecord
  belongs_to :user
  has_many :user_workout_exercises
end