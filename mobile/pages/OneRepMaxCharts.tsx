import { useEffect, useState } from "react";
import { ExmptyOneRepMaxes, GetOneRepMaxes, maxes } from "../api/one_rep_maxes";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text } from "react-native";

const OneRepMaxCharts = () => {
  const [maxes, setMaxes] = useState<maxes | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setMaxes(await GetOneRepMaxes());
    };
    fetch();
  }, []);

  if (maxes == null) {
    return <Text>Empty</Text>;
  }

  return (
    <LineChart
      data={{
        labels: maxes.bench.labels,
        datasets: [{ data: maxes.bench.data }],
      }}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#52d1ff",
        backgroundGradientTo: "#a7e4fa",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#0fbaf7",
        },
      }}
    />
  );
};

export default OneRepMaxCharts;
