import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState, useMemo } from "react";
import {
  CreateUserWorkoutExercise,
  GetAllUserWorkoutExercises,
  GetExercisesForMuscle,
  Workout,
  WorkoutExercise,
} from "../api/workouts";
import LiftyDropdown from "../Components/LiftyDropdown";
import { musclesObjectForDropdown } from "../utils/muscles";
import LiftyTextInput from "../Components/LiftyTextInput";
import LiftyButton from "../Components/LiftyButton";

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
      {workout && <BuildWorkout workout={workout} />}
    </View>
  );
};

interface BuildWorkoutProps {
  workout: Workout;
}

const BuildWorkout = ({ workout }: BuildWorkoutProps) => {
  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);
  const [muscleDropdownOpen, setMuscleDropdownOpen] = useState(false);

  const [selectedMuscle, setSelectedMuscle] = useState<null | string>(null);
  const [selectedExercise, setSelectedExercise] = useState<null | number>(null);

  const [execisesForDropdown, setExercisesForDropdown] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const getExercisesForMuscle = async () => {
      if (selectedMuscle) {
        const exercises = await GetExercisesForMuscle(selectedMuscle);
        setExercisesForDropdown(
          exercises.map((ex) => ({ label: ex.name, value: ex.id }))
        );
      }
    };
    getExercisesForMuscle();
  }, [selectedMuscle]);

  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const exerciseDropdownPlaceHolder =
    selectedMuscle == null ? "Please Select a muscle group first" : undefined;

  const muscles = useMemo(() => musclesObjectForDropdown(), []);
  const buttonEnabled = useMemo(() => {
    return (
      selectedMuscle != null &&
      selectedExercise != null &&
      reps != 0 &&
      sets != 0
    );
  }, [selectedMuscle, selectedExercise, reps, sets]);

  const buttonPress = async () => {
    if (selectedExercise === null) {
      return;
    }
    const userWorkoutExercise: WorkoutExercise = {
      exercise_id: selectedExercise,
      weight,
      reps,
      sets,
      user_workout_id: workout.id,
    };

    await CreateUserWorkoutExercise(userWorkoutExercise);
  };

  return (
    <View>
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
        <View style={styles.dropdown}>
          <LiftyDropdown
            disabled={selectedMuscle === null}
            open={exerciseDropdownOpen}
            setOpen={setExerciseDropdownOpen}
            items={execisesForDropdown}
            setValue={setSelectedExercise}
            value={selectedExercise}
            placeholder={exerciseDropdownPlaceHolder}
          />
        </View>
      </View>
      <LiftyTextInput
        onChange={(value) => {
          setReps(Number(value));
        }}
        placeholder="Number of Reps"
        keyboardType="numeric"
      />
      <LiftyTextInput
        onChange={(value) => {
          setSets(Number(value));
        }}
        placeholder="Number of Sets"
        keyboardType="numeric"
      />
      <LiftyTextInput
        onChange={(value) => {
          setWeight(Number(value));
        }}
        placeholder="Weight"
        keyboardType="numeric"
      />
      <LiftyButton
        text="Add To Workout"
        onPress={buttonPress}
        disabled={!buttonEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdowns: {
    flex: 1,
    flexDirection: "row",
    minHeight: 100,
    zIndex: 100,
  },
  dropdown: {
    width: "50%",
  },
});

export default ViewOrBuildWorkoutPage;
