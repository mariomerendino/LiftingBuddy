class CreateExercisesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :primary_muscles, array: true, default: []
      t.string :secondary_muscles, array: true, default: []
      t.string :equipment
      t.string :instructions, array: true, default: []

      t.timestamps
    end
  end
end