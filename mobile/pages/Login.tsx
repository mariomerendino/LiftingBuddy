import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { GetAuthToken, login } from "../api/auth";

import LiftyTextInput from "../Components/LiftyTextInput";
import LiftyButton from "../Components/LiftyButton";
import AuthTokenContext from "../Contexts/AuthTokenContext";
import LoadingBicep from "../Components/LoadingBicep";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuthToken } = useContext(AuthTokenContext);

  const attemptLogin = async () => {
    setLoading(true);
    if (await login(username, password)) {
      setAuthToken(await GetAuthToken());
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingBicep />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💪</Text>
      <LiftyTextInput
        onChange={(value) => {
          setUsername(value);
        }}
        placeholder="Username"
      />
      <LiftyTextInput
        onChange={(value) => {
          setPassword(value);
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      <LiftyButton
        text="Log In"
        onPress={() => {
          attemptLogin();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
  },
});

export default Login;
