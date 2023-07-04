import { Image, Pressable, StyleSheet } from "react-native";

type IconTypes = "edit" | "back";

interface Props {
  onPress: () => void;
  type?: IconTypes;
}

const typeTable = {
  edit: require("../assets/edit-icon.png"),
  back: require("../assets/back-icon.png"),
};
const IconButton = ({ type = "edit", onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
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
});

export default IconButton;
