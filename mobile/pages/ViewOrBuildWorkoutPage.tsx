import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState, useMemo } from "react";
import {
  Exercise,
  GetAllUserWorkoutExercises,
  GetExercisesForMuscle,
  WorkoutExercise,
} from "../api/workouts";
import LiftyDropdown from "../Components/LiftyDropdown";
import { musclesObjectForDropdown } from "../utils/muscles";

interface Props {
  route: RouteProp<RootDrawerParamList, "Workout">;
}
const ViewOrBuildWorkoutPage = ({ route }: Props) => {
  const workout = route.params.workout;

  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);
  const [muscleDropdownOpen, setMuscleDropdownOpen] = useState(false);

  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  const [workoutExercises, setWorkoutExercises] = useState<
    Array<WorkoutExercise>
  >([]);

  const muscles = useMemo(() => musclesObjectForDropdown(), []);
  const execisesForDropdown = useMemo(
    () => exercises.map((ex) => ({ label: ex.name, value: ex.name })),
    [exercises]
  );

  useEffect(() => {
    const getWorkoutExersises = async () => {
      if (workout) {
        setWorkoutExercises(await GetAllUserWorkoutExercises(workout.id));
      }
    };
    getWorkoutExersises();
  }, [workout]);

  useEffect(() => {
    const getExercises = async () => {
      if (workout) {
        setExercises(await GetExercisesForMuscle(selectedMuscle));
      }
    };
    getExercises();
  }, [selectedMuscle]);

  return (
    <View>
      <Text>{JSON.stringify(workout)}</Text>
      <Text>{JSON.stringify(workoutExercises)}</Text>
      <View style={styles.dropdowns}>
        <View style={styles.dropdown}>
          <LiftyDropdown
            items={muscles}
            setOpen={setMuscleDropdownOpen}
            open={muscleDropdownOpen}
            setValue={setSelectedMuscle}
            value={selectedMuscle}
          />
        </View>

        {selectedMuscle.length > 0 && (
          <View style={styles.dropdown}>
            <LiftyDropdown
              open={exerciseDropdownOpen}
              setOpen={setExerciseDropdownOpen}
              items={execisesForDropdown}
              setValue={setSelectedExercise}
              value={selectedExercise}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdowns: {
    flex: 1,
    flexDirection: "row",
  },
  dropdown: {
    width: "50%",
  },
});

export default ViewOrBuildWorkoutPage;
