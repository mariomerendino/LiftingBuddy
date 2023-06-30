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
      <View style={styles.innerContatiner}>
        <Text style={styles.header}>💪</Text>
        <View style={styles.textInputContainer}>
          <LiftyTextInput
            onChange={(value) => {
              setUsername(value);
            }}
            placeholder="Username"
            customStyles={styles.textinput}
          />
          <LiftyTextInput
            onChange={(value) => {
              setPassword(value);
            }}
            placeholder="Password"
            secureTextEntry={true}
            customStyles={styles.textinput}
          />
          <LiftyButton
            text="Log In"
            onPress={() => {
              attemptLogin();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C3D5DA",
  },
  innerContatiner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    width: "80%",
    maxHeight: "50%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "lightgray",
    borderStyle: "solid",
  },
  header: {
    fontSize: 40,
    paddingBottom: 20,
  },
  textInputContainer: {
    width: "80%",
  },
  textinput: {
    marginBottom: 15,
  },
});

export default Login;
