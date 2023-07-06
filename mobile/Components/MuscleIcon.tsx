import { Image, View, StyleSheet } from "react-native";
import { Muscle } from "../api/workouts";

interface Props {
  muscle: Muscle;
}

const muscleImage = {
  abdominals: require(`../assets/muscles/abdominals.png`),
  hamstrings: require(`../assets/muscles/hamstrings.png`),
  calves: require(`../assets/muscles/calves.png`),
  shoulders: require(`../assets/muscles/shoulders.png`),
  adductors: require(`../assets/muscles/adductors.png`),
  quadriceps: require(`../assets/muscles/quadriceps.png`),
  biceps: require(`../assets/muscles/biceps.png`),
  forearms: require(`../assets/muscles/forearms.png`),
  abductors: require(`../assets/muscles/abductors.png`),
  chest: require(`../assets/muscles/chest.png`),
  "lower back": require(`../assets/muscles/lower back.png`),
  traps: require(`../assets/muscles/traps.png`),
  back: require(`../assets/muscles/back.png`),
  lats: require(`../assets/muscles/lats.png`),
  glutes: require(`../assets/muscles/glutes.png`),
  triceps: require(`../assets/muscles/triceps.png`),
};

const MuscleIcon = ({ muscle }: Props) => {
  return (
    <View style={styles.iconwrapper}>
      <Image style={styles.icon} source={muscleImage[muscle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconwrapper: {
    justifyContent: "center",
    alignItems: "center",
    hieght: 50,
    width: 50,
    backgroundColor: "yellow",
    borderRadius: 4,
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default MuscleIcon;
