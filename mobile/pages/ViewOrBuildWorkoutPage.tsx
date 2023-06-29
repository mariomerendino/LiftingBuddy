import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState } from "react";
import { GetAllUserWorkoutExercises, WorkoutExercise } from "../api/workouts";

interface Props {
  route: RouteProp<RootDrawerParamList, "Workout">;
}
const ViewOrBuildWorkoutPage = ({ route }: Props) => {
  const workout = route.params.workout;
  const [workoutExercises, setWorkoutExercises] = useState<
    Array<WorkoutExercise>
  >([]);

  useEffect(() => {
    const getWorkoutExersises = async () => {
      if (workout) {
        setWorkoutExercises(await GetAllUserWorkoutExercises(workout.id));
      }
    };
    getWorkoutExersises();
  }, [workout]);

  return (
    <View>
      <Text>{JSON.stringify(workout)}</Text>
      <Text>{JSON.stringify(workoutExercises)}</Text>
    </View>
  );
};

export default ViewOrBuildWorkoutPage;
