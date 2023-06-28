import { View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { GetWorkoutsForMonthAndYear, Workout } from "../api/workouts";

interface HighlightedDate {
  selected?: boolean;
  marked?: boolean;
  selectedColor: string;
}

type HighlighedDates = { [key: string]: HighlightedDate };

const today = new Date();

const MainDashboard = () => {
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);

  useEffect(() => {
    // We should have a loading state for this...
    const fetchWorkoutDates = async () => {
      setWorkouts(await GetWorkoutsForMonthAndYear(month, year));
    };
    fetchWorkoutDates();
  }, [month, year]);

  const formattedSelectedDates = useMemo(() => {
    let object: HighlighedDates = {};
    workouts.forEach((workout) => {
      object[`${workout.workout_date}`] = {
        selected: true,
        marked: true,
        selectedColor: "lightblue",
      };
    });

    return object;
  }, [workouts]);

  return (
    <View>
      <Calendar
        onMonthChange={(date) => {
          setMonth(date.month);
          setYear(date.year);
        }}
        onDayPress={(day) => {
          console.log(day);
        }}
        markedDates={formattedSelectedDates}
      />
    </View>
  );
};
export default MainDashboard;
