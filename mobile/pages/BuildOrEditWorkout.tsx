import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState, useMemo } from "react";
import {
  CreateUserWorkoutExercise,
  GetExercisesForMuscle,
  Workout,
  WorkoutExercise,
} from "../api/workouts";
import LiftyDropdown from "../Components/LiftyDropdown";
import { musclesObjectForDropdown } from "../utils/muscles";
import LiftyTextInput from "../Components/LiftyTextInput";
import LiftyButton from "../Components/LiftyButton";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<RootDrawerParamList, "Edit Workout">;
  navigation: NavigationProp<RootDrawerParamList>;
}

const BuildOrEditWorkout = ({ route, navigation }: Props) => {
  const workout = route.params.workout;

  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);
  const [muscleDropdownOpen, setMuscleDropdownOpen] = useState(false);

  const [selectedMuscle, setSelectedMuscle] = useState<null | string>(null);
  const [selectedExercise, setSelectedExercise] = useState<null | number>(null);

  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

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
    navigation.goBack();
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

export default BuildOrEditWorkout;
