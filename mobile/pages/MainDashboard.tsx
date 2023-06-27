import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

const MainDashboard = () => {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          console.log(day);
        }}
      />
    </View>
  );
};
export default MainDashboard;
