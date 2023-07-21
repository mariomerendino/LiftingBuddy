import { Pressable, StyleSheet, Text } from "react-native";
import LiftyText from "./LiftyText";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  type?: "primary" | "secondary";
}

const LiftyButton = ({
  onPress,
  text,
  disabled = false,
  type = "primary",
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[type],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <LiftyText>{text}</LiftyText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 40,
  },
  primary: {
    backgroundColor: "#ADD8E6",
  },
  secondary: {
    backgroundColor: "#D3D3D3",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default LiftyButton;
