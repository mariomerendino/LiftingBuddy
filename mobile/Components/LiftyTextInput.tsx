import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  View,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  onChange: (text: string) => void | ((text: number) => void);
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  customStyles?: StyleProp<ViewStyle>;
  value: string | number | null;
  hasError?: boolean;
}

const LiftyTextInput = ({
  onChange,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  customStyles = undefined,
  value,
  hasError = false,
}: Props) => {
  const [protectPassword, setProtectPassword] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.base, customStyles, hasError && styles.error]}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={protectPassword && secureTextEntry}
        keyboardType={keyboardType}
        value={value != null ? String(value) : undefined}
      />
      {secureTextEntry && (
        <Pressable onPress={() => setProtectPassword(!protectPassword)}>
          <Entypo
            style={{ marginLeft: 4, marginTop: 10 }}
            name={protectPassword ? "eye-with-line" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
  },
  base: {
    width: "100%",
    height: 40,
    borderColor: "lightgray",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  error: {
    borderColor: "red",
  },
});

export default LiftyTextInput;
