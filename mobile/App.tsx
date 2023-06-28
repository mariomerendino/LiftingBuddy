import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { GetAuthToken, userHasValidAuthToken } from "./api/auth";
import { useRef, useEffect, useContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDashboard from "./pages/MainDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthTokenContext from "./Contexts/AuthTokenContext";
import ViewOrBuildWorkoutPage from "./pages/ViewOrBuildWorkoutPage";
import { Workout } from "./api/workouts";

const Stack = createNativeStackNavigator();
export type RootDrawerParamList = {
  Home: {};
  Notifications: {};
  Settings: {};
  Workout: { workout: Workout | null };
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authTokenIsValid, setAuthTokenIsValid] = useState(false);

  useEffect(() => {
    const validateAuthToken = async () => {
      const authTokenLocal = await GetAuthToken();
      setAuthToken(authTokenLocal);
      const isAuthTokenValid = await userHasValidAuthToken();
      setAuthTokenIsValid(isAuthTokenValid);
    };

    validateAuthToken();
  }, [authToken, authTokenIsValid]);

  return (
    <AuthTokenContext.Provider
      value={{ authToken, setAuthToken, authTokenIsValid, setAuthTokenIsValid }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {authTokenIsValid ? (
            <Stack.Screen
              name="MainPage"
              component={MainPage}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthTokenContext.Provider>
  );
}

const MainPage = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={MainDashboard} />
      <Drawer.Screen name="Notifications" component={NotificationsPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen
        name="Workout"
        component={ViewOrBuildWorkoutPage}
        initialParams={{ workout: null }}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
};
