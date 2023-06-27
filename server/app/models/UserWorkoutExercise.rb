class UserWorkoutExercise < ApplicationRecord
  belongs_to :user_workout
  belongs_to :exercise
end