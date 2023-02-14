import { useState } from "react";
import { Text, View, ScrollView, Image, Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const { width } = Dimensions.get("window");
const height = width * 0.5;

const images = ["https://news.miami.edu/life/_assets/images/images-stories/2019/11/recycling-greenu-940x529.jpg", "https://api.watsons.co.id/api/v2/wtcid/blog/wp-content/uploads/0533-Main-Banner-3.png", "https://bessemercity.com/wp-content/uploads/2020/05/GlobalRecyclingDay-2019.jpg"];

export default function Carousel() {
  const [img, setImg] = useState({
    active: 0,
  });

  function changeSlide({ nativeEvent }) {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== img.active) {
      setImg({ active: slide });
    }
  }

  return (
    <>
      <View style={style.container}>
        <ScrollView pagingEnabled horizontal onScroll={changeSlide} showsHorizontalScrollIndicator={false} style={style.scroll}>
          {images.map((image, index) => {
            return <Image key={index} source={{ uri: image }} style={style.image} />;
          })}
        </ScrollView>
        <View style={style.pagination}>
          {images.map((i, k) => {
            return (
              <Text key={k} style={k === img.active ? style.activePagination : style.text}>
                ⬤
              </Text>
            );
          })}
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  scroll: { width, height },
  image: {
    width,
    height: 150,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  text: { fontSize: width / 30, color: "white", margin: 3 },
  activePagination: { fontSize: width / 30, color: COLORS.primaryShade[400], margin: 3 },
});
