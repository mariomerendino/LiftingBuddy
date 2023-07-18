import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { GetAuthToken, userHasValidAuthToken } from "./api/auth";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDashboard from "./pages/MainDashboard";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthTokenContext from "./Contexts/AuthTokenContext";
import ViewWorkoutPage from "./pages/ViewWorkoutPage";
import { Workout, WorkoutExercise } from "./api/workouts";
import BuildOrEditWorkout from "./pages/BuildOrEditWorkout";
import IconButton from "./Components/IconButton";
import { useFonts } from "expo-font";
import FontLoadedContext from "./Contexts/FontLoadedContext";

const Stack = createNativeStackNavigator();

export interface WorkoutPageParams {
  workout: Workout | null;
}

export interface EditWorkoutPageParams {
  workout: Workout;
  workoutExercise?: WorkoutExercise;
  isEdit?: boolean;
}

export type RootDrawerParamList = {
  Home: {};
  Insights: {};
  Settings: {};
  Workout: WorkoutPageParams;
  "Edit Workout": EditWorkoutPageParams;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authTokenIsValid, setAuthTokenIsValid] = useState(false);
  const [isLoaded] = useFonts({
    OptimisticDisplayRegular: require("./assets/fonts/OptimisticDisplayRegular.ttf"),
  });

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
      <FontLoadedContext.Provider value={{ fontLoaded: isLoaded }}>
        <NavigationContainer>
          {authTokenIsValid ? (
            <MainNavigation />
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </FontLoadedContext.Provider>
    </AuthTokenContext.Provider>
  );
}

const MainNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" backBehavior="history">
      <Drawer.Screen name="Home" component={MainDashboard} />
      <Drawer.Screen name="Insights" component={InsightsPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen
        name="Workout"
        component={ViewWorkoutPage}
        initialParams={{ workout: null }}
        options={({ navigation }) => ({
          drawerItemStyle: { display: "none" },
          headerLeft: () => (
            <IconButton
              type="back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Edit Workout"
        component={BuildOrEditWorkout}
        initialParams={{
          workout: {
            created_at: "",
            id: 0,
            user_id: 0,
            workout_date: "",
            user_workout_exercises: [],
          },
        }}
        options={({ navigation }) => ({
          drawerItemStyle: { display: "none" },
          headerLeft: () => (
            <IconButton
              type="back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};
