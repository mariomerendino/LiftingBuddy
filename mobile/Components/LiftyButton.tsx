import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress: () => void;
  text: string;
}

const LiftyButton = ({ onPress, text }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 40,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default LiftyButton;
