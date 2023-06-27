class ImportExercises < ActiveRecord::Migration[7.0]
  def up
    file = File.read('./exercises/exercises.json')
    json = JSON.parse(file)
    json["rows"].each do |row|
      Exercise.create!(
        name: row[1],
        primary_muscles: JSON.parse(row[6]),
        secondary_muscles: JSON.parse(row[7]),
        instructions: JSON.parse(row[8]),
        equipment: row[5],
      )
    end
  end
  
  def down
    Exercise.delete_all
  end
end
