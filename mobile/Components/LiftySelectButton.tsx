import { Pressable, StyleSheet, Text } from "react-native";
import IconButton from "./IconButton";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}
const LiftySelectButton = ({ onPress, text, disabled = false }: Props) => {
  return (
    <Pressable style={styles.base} onPress={onPress} disabled={disabled}>
      <Text>{text}</Text>
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
});

export default LiftySelectButton;
