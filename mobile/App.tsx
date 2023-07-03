import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { GetAuthToken, userHasValidAuthToken } from "./api/auth";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDashboard from "./pages/MainDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthTokenContext from "./Contexts/AuthTokenContext";
import ViewWorkoutPage from "./pages/ViewWorkoutPage";
import { Workout, WorkoutExercise } from "./api/workouts";
import BuildOrEditWorkout from "./pages/BuildOrEditWorkout";

const Stack = createNativeStackNavigator();

export interface WorkoutPageParams {
  workout: Workout | null;
}

export interface EditWorkoutPageParams {
  workout: Workout;
  workoutExercise?: WorkoutExercise;
}

export type RootDrawerParamList = {
  Home: {};
  Notifications: {};
  Settings: {};
  Workout: WorkoutPageParams;
  "Edit Workout": EditWorkoutPageParams;
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
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
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
        component={ViewWorkoutPage}
        initialParams={{ workout: null }}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Edit Workout"
        component={BuildOrEditWorkout}
        initialParams={{
          workout: { created_at: "", id: 0, user_id: 0, workout_date: "" },
        }}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
};
