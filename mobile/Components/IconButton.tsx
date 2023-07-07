import { Image, Pressable, StyleSheet } from "react-native";

type IconTypes = "edit" | "back" | "check" | "forward" | "downward";

interface Props {
  onPress: () => void;
  type?: IconTypes;
}

const typeTable = {
  edit: require("../assets/edit-icon.png"),
  check: require("../assets/check-icon.png"),
  back: require("../assets/back-icon.png"),
  forward: require("../assets/back-icon.png"),
  downward: require("../assets/back-icon.png"),
};
const IconButton = ({ type = "edit", onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        type === "forward" && styles.forward,
        type === "downward" && styles.downward,
      ]}
    >
      <Image source={typeTable[type]} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {},
  pressed: {
    opacity: 0.8,
  },
  image: {
    height: 20,
    width: 20,
  },
  forward: {
    transform: [{ rotate: "180deg" }],
  },
  downward: {
    transform: [{ rotate: "-90deg" }],
  },
});

export default IconButton;
