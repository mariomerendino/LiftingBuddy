import { useEffect, useRef, useState } from "react";
import { GetOneRepMaxes, maxes, oneRepMax } from "../api/insights";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import LiftyText from "../Components/LiftyText";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const LIFTS = ["Bench", "Deadlift", "Squat"];

const OneRepMaxCharts = () => {
  const [index, setIndex] = useState(0);
  const [maxes, setMaxes] = useState<maxes | null>(null);
  const isCarousel = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      setMaxes(await GetOneRepMaxes());
    };
    fetch();
  }, []);

  if (maxes == null) {
    return <LiftyText>Empty</LiftyText>;
  }

  const data = Object.values(maxes);

  return (
    <View>
      <LiftyText> One Rep Max Tracker </LiftyText>
      <Carousel
        layout={"default"}
        ref={isCarousel}
        data={data}
        renderItem={Chart}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        vertical={false}
        enableSnap={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

interface ChartProps {
  index: number;
  dataIndex: number;
  item: oneRepMax;
}

const Chart = ({ item, index, dataIndex }: ChartProps) => {
  if (item.data.length == 0) {
    return (
      <View>
        <View
          style={{
            width: ITEM_WIDTH,
            height: 250,
            backgroundColor: "#a7e4fa",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LiftyText>You dont have any data on this lift!</LiftyText>
        </View>
        <Text style={{ fontSize: 30 }}>{LIFTS[index]}</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{ width: "90%", justifyContent: "center", alignItems: "center" }}
      >
        <LineChart
          data={{
            labels: item.labels,
            datasets: [{ data: item.data }],
          }}
          width={ITEM_WIDTH}
          height={250}
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
      </View>
      <Text style={{ fontSize: 30 }}>{LIFTS[index]}</Text>
    </View>
  );
};

export default OneRepMaxCharts;
