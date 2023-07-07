import { View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import {
  CreateOrFetchUserWorkout,
  GetWorkoutsForMonthAndYear,
  Workout,
} from "../api/workouts";
import { NavigationProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";

interface HighlightedDate {
  selected?: boolean;
  marked?: boolean;
  selectedColor: string;
}

type HighlighedDates = { [key: string]: HighlightedDate };

interface Props {
  navigation: NavigationProp<RootDrawerParamList>;
}

const today = new Date();

const MainDashboard = ({ navigation }: Props) => {
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
    if (workouts && workouts.length > 0) {
      workouts.forEach((workout) => {
        let color;
        if (workout.user_workout_exercises.length === 0) {
          color = "lightgray";
        } else if (workout.user_workout_exercises.length < 4) {
          color = "lightblue";
        } else {
          color = "lightgreen";
        }
        object[`${workout.workout_date}`] = {
          selected: true,
          marked: true,
          selectedColor: color,
        };
      });
    }

    return object;
  }, [workouts]);

  return (
    <View>
      <Calendar
        onMonthChange={(date) => {
          setMonth(date.month);
          setYear(date.year);
        }}
        onDayPress={async (day) => {
          let workout = await CreateOrFetchUserWorkout(
            day.month,
            day.year,
            day.day
          );

          navigation.navigate("Workout", { workout });
        }}
        markedDates={formattedSelectedDates}
      />
    </View>
  );
};
export default MainDashboard;
