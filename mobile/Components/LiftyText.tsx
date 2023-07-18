import { Text, TextProps, StyleSheet } from "react-native";
import FontLoadedContext from "../Contexts/FontLoadedContext";
import { useContext } from "react";
const LiftyText = (props: TextProps) => {
  const { fontLoaded } = useContext(FontLoadedContext);
  const { children, ...rest } = props;

  return (
    <Text style={[fontLoaded && styles.base, rest.style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "OptimisticDisplayRegular",
    fontSize: 16,
  },
});

export default LiftyText;
