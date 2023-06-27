import { View } from "react-native";
import LiftyButton from "../Components/LiftyButton";
import { deleteAuthToken } from "../api/auth";
import { useContext } from "react";
import AuthTokenContext from "../Contexts/AuthTokenContext";

const SettingsPage = () => {
  const { setAuthToken, setAuthTokenIsValid } = useContext(AuthTokenContext);
  return (
    <View>
      <LiftyButton
        text="Log out"
        onPress={() => {
          deleteAuthToken();
          setAuthToken(null);
          setAuthTokenIsValid(false);
        }}
      />
    </View>
  );
};
export default SettingsPage;
