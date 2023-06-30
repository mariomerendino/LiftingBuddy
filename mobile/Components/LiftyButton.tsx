import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

const LiftyButton = ({ onPress, text, disabled = false }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
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
  disabled: {
    opacity: 0.4,
  },
});

export default LiftyButton;
