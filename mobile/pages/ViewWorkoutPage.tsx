import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState } from "react";
import { GetAllUserWorkoutExercises, WorkoutExercise } from "../api/workouts";
import EditButton from "../Components/EditButton";
import LiftyButton from "../Components/LiftyButton";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<RootDrawerParamList, "Workout">;
  navigation: NavigationProp<RootDrawerParamList>;
}

const ViewWorkoutPage = ({ route, navigation }: Props) => {
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

  const navigateToBuildPage = () => {
    if (workout) {
      navigation.navigate("Edit Workout", { workout });
    }
  };

  return (
    <View>
      <AllWorkoutExercises workoutExercises={workoutExercises} />
      <LiftyButton onPress={navigateToBuildPage} text="Add Exercise" />
    </View>
  );
};

interface AllWorkoutExercisestProps {
  workoutExercises: Array<WorkoutExercise>;
}

const AllWorkoutExercises = ({
  workoutExercises,
}: AllWorkoutExercisestProps) => {
  return (
    <View>
      <View style={styles.workoutExercise}>
        <Text>Exercise</Text>
        <Text>Reps</Text>
        <Text>Sets</Text>
        <Text>Weight</Text>
        <Text>Edit</Text>
      </View>
      {workoutExercises.map((workoutExercise) => (
        <View style={styles.workoutExercise} key={workoutExercise.id}>
          <Text>{workoutExercise.exercise?.name}</Text>
          <Text>{workoutExercise.reps}</Text>
          <Text>{workoutExercise.sets}</Text>
          <Text>{workoutExercise.reps}</Text>
          <EditButton onPress={() => {}} />
        </View>
      ))}
    </View>
  );
};

export default ViewWorkoutPage;

const styles = StyleSheet.create({
  workoutExercise: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "lightgray",
  },
});
