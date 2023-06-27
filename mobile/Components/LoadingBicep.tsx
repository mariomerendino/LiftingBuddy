import { Image, StyleSheet } from "react-native";

const LoadingBicep = () => {
  return <Image style={styles.image} source={require("../assets/bicep.gif")} />;
};

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
  },
});
export default LoadingBicep;
