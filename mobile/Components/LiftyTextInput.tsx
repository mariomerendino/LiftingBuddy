import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface Props {
  onChange: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

const LiftyTextInput = ({
  onChange,
  placeholder,
  secureTextEntry = false,
}: Props) => {
  return (
    <TextInput
      style={styles.base}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    height: 30,
    borderColor: "lightgray",
    borderRadius: 2,
    borderStyle: "solid",
    borderWidth: 1,
    width: "100%",
  },
});

export default LiftyTextInput;
