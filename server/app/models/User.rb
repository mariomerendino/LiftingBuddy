class User < ApplicationRecord
  has_secure_password
  has_many :user_workouts
  has_many :user_workout_exercises, :through => :user_workouts
end