class CreateUserWorkoutExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :user_workout_exercises do |t|
      t.belongs_to :user_workout
      t.integer :exercise_id
      t.integer :reps
      t.integer :sets
      t.timestamps
    end
  end
end
