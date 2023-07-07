import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  onChange: (text: string) => void | ((text: number) => void);
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  customStyles?: StyleProp<ViewStyle>;
  value: string | number | null;
}

const LiftyTextInput = ({
  onChange,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  customStyles = undefined,
  value,
}: Props) => {
  return (
    <TextInput
      style={[styles.base, customStyles]}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={value != null ? String(value) : undefined}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderColor: "lightgray",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default LiftyTextInput;
