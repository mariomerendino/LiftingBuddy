class CreateUserWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :user_workouts do |t|
      t.belongs_to :user
      t.date :workout_date
      t.timestamps
    end
  end
end
