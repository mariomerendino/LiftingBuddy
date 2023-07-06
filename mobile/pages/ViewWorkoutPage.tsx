import { View, Text, StyleSheet, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState } from "react";
import {
  GetAllUserWorkoutExercises,
  Workout,
  WorkoutExercise,
} from "../api/workouts";
import IconButton from "../Components/IconButton";
import LiftyButton from "../Components/LiftyButton";
import { NavigationProp } from "@react-navigation/native";
import MuscleIcon from "../Components/MuscleIcon";

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
    navigation.setOptions({ headerTitle: `Workout ${workout?.workout_date}` });
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
      {workout && (
        <AllWorkoutExercises
          workout={workout}
          workoutExercises={workoutExercises}
          navigation={navigation}
        />
      )}
      <LiftyButton onPress={navigateToBuildPage} text="Add Exercise" />
    </View>
  );
};

interface AllWorkoutExercisestProps {
  workout: Workout;
  workoutExercises: Array<WorkoutExercise>;
  navigation: NavigationProp<RootDrawerParamList>;
}

const AllWorkoutExercises = ({
  workoutExercises,
  navigation,
  workout,
}: AllWorkoutExercisestProps) => {
  return (
    <View>
      {workoutExercises.map((workoutExercise) => (
        <Pressable
          style={styles.workoutExercise}
          key={workoutExercise.id}
          onPress={() => {
            navigation.navigate("Edit Workout", {
              workout,
              workoutExercise,
              isEdit: true,
            });
          }}
        >
          <MuscleIcon
            muscle={workoutExercise.exercise?.primary_muscles[0] ?? "lats"}
          />
          <Text style={styles.workoutName}>
            {workoutExercise.exercise?.name}
          </Text>
          <View style={styles.forwardIcon}>
            <IconButton
              type="forward"
              onPress={() => {
                navigation.navigate("Edit Workout", {
                  workout,
                  workoutExercise,
                  isEdit: true,
                });
              }}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default ViewWorkoutPage;

const styles = StyleSheet.create({
  workoutExercise: {
    height: 40,
    flexDirection: "row",
    borderBottomColor: "lightgray",
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    paddingLeft: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  workoutName: {
    paddingLeft: 20,
  },
  forwardIcon: {
    flex: 1,
    margin: "auto",
    paddingRight: 20,
  },
});
