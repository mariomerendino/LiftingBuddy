import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamList } from "../App";

interface Props {
  route: RouteProp<RootDrawerParamList>;
}
const ViewOrBuildWorkoutPage = ({ route }: Props) => {
  const workout = route.params;
  return (
    <View>
      <Text>{JSON.stringify(workout)}</Text>
    </View>
  );
};

export default ViewOrBuildWorkoutPage;
