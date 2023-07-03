import { Image, Pressable, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}
const EditButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <Image source={require("../assets/edit-icon.png")} style={styles.image} />
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

export default EditButton;
