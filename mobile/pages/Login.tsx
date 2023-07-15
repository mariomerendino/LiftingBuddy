import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { GetAuthToken, Register, login } from "../api/auth";

import LiftyTextInput from "../Components/LiftyTextInput";
import LiftyButton from "../Components/LiftyButton";
import AuthTokenContext from "../Contexts/AuthTokenContext";
import LoadingBicep from "../Components/LoadingBicep";

interface LoginOrRegistrationFormProps {
  setLoading: (arg0: boolean) => void;
}

interface user {
  username: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationForm = ({ setLoading }: LoginOrRegistrationFormProps) => {
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [user, setUser] = useState<user>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const { setAuthToken } = useContext(AuthTokenContext);

  const attemptCreation = async () => {
    if (user.password != user.passwordConfirmation) {
      setPasswordHasError(true);
      alert("Passwords must match");
      return;
    }
    setLoading(true);
    if (await Register(user.username, user.password)) {
      setAuthToken(await GetAuthToken());
    }
    setLoading(false);
  };

  return (
    <View style={styles.textInputContainer}>
      <LiftyTextInput
        onChange={(value) => {
          setUser((prev) => ({ ...prev, username: value }));
        }}
        placeholder="Username"
        customStyles={styles.textinput}
        value={user.username}
      />
      <LiftyTextInput
        onChange={(value) => {
          setPasswordHasError(false);
          setUser((prev) => ({ ...prev, password: value }));
        }}
        placeholder="Password"
        secureTextEntry={true}
        customStyles={styles.textinput}
        value={user.password}
        hasError={passwordHasError}
      />
      <LiftyTextInput
        onChange={(value) => {
          setPasswordHasError(false);
          setUser((prev) => ({ ...prev, passwordConfirmation: value }));
        }}
        placeholder="Password Confirmation"
        secureTextEntry={true}
        customStyles={styles.textinput}
        value={user.passwordConfirmation}
        hasError={passwordHasError}
      />
      <LiftyButton
        text="Register"
        onPress={() => {
          attemptCreation();
        }}
      />
    </View>
  );
};

const LoginForm = ({ setLoading }: LoginOrRegistrationFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthToken } = useContext(AuthTokenContext);

  const attemptLogin = async () => {
    setLoading(true);
    if (await login(username, password)) {
      setAuthToken(await GetAuthToken());
    }
    setLoading(false);
  };

  return (
    <View style={styles.textInputContainer}>
      <LiftyTextInput
        onChange={(value) => {
          setUsername(value);
        }}
        placeholder="Username"
        customStyles={styles.textinput}
        value={username}
      />
      <LiftyTextInput
        onChange={(value) => {
          setPassword(value);
        }}
        placeholder="Password"
        secureTextEntry={true}
        customStyles={styles.textinput}
        value={password}
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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingBicep />
      </View>
    );
  }

  const RegisterOrLoginText = () => {
    const text = isRegistering ? "Been here before? " : "New around here? ";

    return (
      <View style={{ flexDirection: "row", paddingVertical: 20 }}>
        <Text>{text}</Text>
        <Pressable onPress={() => setIsRegistering((prev) => !prev)}>
          <Text style={{ color: "lightblue" }}>Click here!</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContatiner}>
        <Text style={styles.header}>💪</Text>
        {isRegistering ? (
          <RegistrationForm setLoading={setLoading} />
        ) : (
          <LoginForm setLoading={setLoading} />
        )}
        <RegisterOrLoginText />
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
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    minHieght: "80vh",
    width: "80%",
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
