import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";
import { useEffect, useState, useMemo } from "react";
import {
  CreateUserWorkoutExercise,
  EditUserWorkoutExercise,
  GetExercisesForMuscle,
  WorkoutExercise,
} from "../api/workouts";
import { musclesObjectForDropdown } from "../utils/muscles";
import LiftyTextInput from "../Components/LiftyTextInput";
import LiftyButton from "../Components/LiftyButton";
import { NavigationProp } from "@react-navigation/native";
import LiftySelectBottomSheet from "../Components/LiftySelectBottomSheet";
import LiftySelectButton from "../Components/LiftySelectButton";

interface Props {
  route: RouteProp<RootDrawerParamList, "Edit Workout">;
  navigation: NavigationProp<RootDrawerParamList>;
}

const BuildOrEditWorkout = ({ route, navigation }: Props) => {
  const workout = route.params.workout;
  const workoutExercise = route.params.workoutExercise;
  const isEdit = route.params.isEdit ?? false;

  const [exerciseDropdownOpen, setExerciseDropdownOpen] = useState(false);
  const [muscleDropdownOpen, setMuscleDropdownOpen] = useState(false);

  const [selectedMuscle, setSelectedMuscle] = useState<null | string>(null);
  const [selectedExercise, setSelectedExercise] = useState<null | number>(null);

  const [weight, setWeight] = useState<null | number>(null);
  const [sets, setSets] = useState<null | number>(null);
  const [reps, setReps] = useState<null | number>(null);

  const [execisesForDropdown, setExercisesForDropdown] = useState<
    { label: string; value: number }[]
  >([]);

  const getExercisesForMuscle = async () => {
    if (selectedMuscle) {
      const exercises = await GetExercisesForMuscle(selectedMuscle);
      setExercisesForDropdown(
        exercises.map((ex) => ({ label: ex.name, value: ex.id }))
      );
    }
  };

  useEffect(() => {
    if (isEdit && workoutExercise != null) {
      navigation.setOptions({ headerTitle: "Edit Workout Exercise" });
      setSelectedMuscle(workoutExercise.exercise?.primary_muscles[0] ?? null);
      getExercisesForMuscle();
      setSelectedExercise(workoutExercise.exercise?.id ?? null);
      setWeight(workoutExercise.weight);
      setReps(workoutExercise.reps);
      setSets(workoutExercise.sets);
    } else {
      navigation.setOptions({ headerTitle: "Add Workout Exercise" });
      setSelectedMuscle(null);
      setSelectedExercise(null);
      setWeight(null);
      setReps(null);
      setSets(null);
    }
  }, [isEdit, workoutExercise]);

  useEffect(() => {
    getExercisesForMuscle();
  }, [selectedMuscle]);

  const exerciseSelectButtonText = (): string => {
    if (selectedMuscle == null) {
      return "Please Select a muscle group first";
    } else if (selectedExercise == null) {
      return "Please Select an Exercise";
    } else if (selectedExercise != null) {
      const selected = execisesForDropdown.find(
        (ex) => ex.value === selectedExercise
      );
      if (selected) {
        return selected.label;
      }
    }
    return "";
  };

  const muscleSelectButtonText = () => {
    if (selectedMuscle == null) {
      return "Please Select a muscle group";
    } else {
      return selectedMuscle;
    }
  };

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
      weight: weight ?? 0,
      reps: reps ?? 0,
      sets: sets ?? 0,
      user_workout_id: workout.id,
    };
    if (isEdit) {
      userWorkoutExercise["id"] = workoutExercise?.id;
      await EditUserWorkoutExercise(userWorkoutExercise);
    } else {
      await CreateUserWorkoutExercise(userWorkoutExercise);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.dropdowns}>
          <View style={styles.dropdown}>
            <LiftySelectButton
              onPress={() => {
                if (muscleDropdownOpen) {
                  setMuscleDropdownOpen(false);
                } else {
                  setMuscleDropdownOpen(true);
                  setExerciseDropdownOpen(false);
                }
              }}
              text={muscleSelectButtonText()}
            />
          </View>
          <View style={styles.dropdown}>
            <LiftySelectButton
              onPress={() => {
                if (exerciseDropdownOpen) {
                  setExerciseDropdownOpen(false);
                } else {
                  setExerciseDropdownOpen(true);
                  setMuscleDropdownOpen(false);
                }
              }}
              text={exerciseSelectButtonText()}
              disabled={selectedMuscle == null}
            />
          </View>
        </View>
        <Text>Reps</Text>
        <LiftyTextInput
          onChange={(value) => {
            setReps(Number(value));
          }}
          placeholder="Number of Reps"
          keyboardType="numeric"
          value={reps}
        />
        <Text>Sets</Text>
        <LiftyTextInput
          onChange={(value) => {
            setSets(Number(value));
          }}
          placeholder="Number of Sets"
          keyboardType="numeric"
          value={sets}
        />
        <Text>Weight</Text>
        <LiftyTextInput
          onChange={(value) => {
            setWeight(Number(value));
          }}
          placeholder="Weight"
          keyboardType="numeric"
          value={weight}
        />
      </ScrollView>
      <View style={{ height: 80, paddingHorizontal: 30 }}>
        <LiftyButton
          text={isEdit ? "Confirm Edits" : "Add To Workout"}
          onPress={buttonPress}
          disabled={!buttonEnabled}
        />
      </View>
      <LiftySelectBottomSheet
        setIsOpen={setExerciseDropdownOpen}
        isOpen={exerciseDropdownOpen}
        items={execisesForDropdown}
        setValue={setSelectedExercise}
        value={selectedExercise}
      />
      <LiftySelectBottomSheet
        items={muscles}
        setIsOpen={setMuscleDropdownOpen}
        isOpen={muscleDropdownOpen}
        setValue={setSelectedMuscle}
        value={selectedMuscle}
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
