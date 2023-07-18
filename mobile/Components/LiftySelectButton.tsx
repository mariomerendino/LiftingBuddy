import { Pressable, StyleSheet, Text } from "react-native";
import IconButton from "./IconButton";
import LiftyText from "./LiftyText";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}
const LiftySelectButton = ({ onPress, text, disabled = false }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
    >
      <LiftyText>{text}</LiftyText>
      <IconButton onPress={onPress} type="downward" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  pressed: {
    opacity: 0.6,
  },
});

export default LiftySelectButton;
