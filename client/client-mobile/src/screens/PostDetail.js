import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView } from "native-base";
import mapPlaceHolder from "../../assets/placeHolder/mapPlaceHolder.png";
import approximateLoc from "../../assets/approximateLoc.png";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useQuery } from "@apollo/client";
import { GET_POST_DETAIL } from "../query/Posts";
import { GET_CATEGORY_ID } from "../query/Categories";
import { capitalize } from "../helpers/util";
import Loader from "../components/Loader";

const MAP_PLACEHOLDER = Image.resolveAssetSource(mapPlaceHolder).uri;
const MARKER_APPROXIMATE = Image.resolveAssetSource(approximateLoc).uri;

export default function PostDetail({ navigation, route }) {
  // const [mapRegion, setmapRegion] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     } else {
  //       let location = await Location.watchPositionAsync(
  //         {
  //           accuracy: Location.Accuracy.High,
  //           timeInterval: 10000,
  //           distanceInterval: 10,
  //         },
  //         (location_update) => {
  //           console.log("update location!", location_update.coords, new Date());
  //           setmapRegion({
  //             latitude: location_update.coords.latitude,
  //             longitude: location_update.coords.longitude,
  //           });
  //         }
  //       );
  //     }
  //   })();
  // }, []);

  const { id: postId } = route.params;
  // const categoryId = postDetailData?.getPostById?.category_id;
  // console.log(postDetailData);

  const {
    data: postDetailData,
    loading: postDetailLoading,
    error: postDetailError,
  } = useQuery(GET_POST_DETAIL, { variables: { postId } });
  const {
    data: categoryDetailData,
    loading: categoryDetailLoading,
    error: categoryDetailError,
    refetch,
  } = useQuery(GET_CATEGORY_ID, { variables: null });

  useEffect(() => {
    if (postDetailData) {
      refetch({ categoryId: postDetailData?.getPostById?.category_id });
    }
  }, [postDetailData]);

  if (postDetailLoading && categoryDetailLoading) return <Loader />;
  // if (postDetailError) {
  //   console.log("postDetailError ---------------------");
  //   console.log(postDetailError);
  //   console.log("postDetailError ---------------------");

  //   // return <Text>Error: {postDetailError}</Text>;
  // }
  // console.log("productId:", postId);
  // console.log("ProductDetailData: ", postDetailData.getPostById);
  // console.log("CategoryDetail: ", categoryDetailData.getCategoryById);

  return (
    <View>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.imageContainer}>
        <Image source={{ uri: "http://placekitten.com/150/150" }} style={styles.image} />
      </View> */}
          <View style={styles.imageContainer2}>
            <Image
              source={{ uri: postDetailData?.getPostById?.mainImage }}
              style={styles.image}
            />
          </View>
          <View style={styles.postDetail}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>
                {postDetailData
                  ? capitalize(postDetailData?.getPostById?.title)
                  : ""}
              </Text>
              <Button
                onPress={() => console.log("jalan delete")}
                variant="unstyled"
              >
                <Feather name="trash-2" size={24} color="red" />
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.category}>
                {postDetailData
                  ? categoryDetailData?.getCategoryById?.name
                  : ""}
              </Text>
            </View>
            <View>
              <Text>Placeholder biar gampang:</Text>
              <Text>
                Total harga:{" "}
                {postDetailData?.getPostById?.quantity *
                  categoryDetailData?.getCategoryById?.price}
              </Text>
              <Text>Lat: {postDetailData?.getPostById?.lat}</Text>
              <Text>Long: {postDetailData?.getPostById?.long}</Text>
              <Text>Giver_id: {postDetailData?.getPostById?.giver_id}</Text>
              <Text>Status: {postDetailData?.getPostById?.status}</Text>
            </View>
            <Text>
              {postDetailData
                ? capitalize(postDetailData?.getPostById?.description)
                : ""}
            </Text>
            {/* <Text style={styles.subTitle}>Photos</Text> */}
            <Text style={styles.subTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                // showsUserLocation={true}
                followUserLocation={true}
                loadingEnabled={true}
                region={{
                  latitude: ~~postDetailData?.getPostById?.lat,
                  longitude: ~~postDetailData?.getPostById?.long,
                  latitudeDelta: 0.053,
                  longitudeDelta: 0.053,
                }}
              >
                {postDetailData && (
                  <Marker
                    coordinate={{
                      latitude: ~~postDetailData?.getPostById?.lat,
                      longitude: ~~postDetailData?.getPostById?.long,
                    }}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    image={{ uri: MARKER_APPROXIMATE }}
                  />
                )}
              </MapView>
              {/* <Image source={{ uri: MAP_PLACEHOLDER }} style={styles.image} /> */}
            </View>
          </View>
          {/* <View style={{ alignItems: "center" }}>
        <Button style={styles.button}>Set Appointment</Button>
      </View> */}
          <Button onPress={() => console.log("Jalan appointment")} height={100}>
            Set Appointment
          </Button>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    overflow: "hidden",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    // marginTop:,
    height: 200,
    // flex: 1,
  },
  imageContainer2: {
    overflow: "hidden",
    backgroundColor: "yellow",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  postDetail: {
    flex: 2,
    padding: 20,
    // backgroundColor: "tomato",
    backgroundColor: "white",
    borderTopColor: "gray",
  },
  // imageContainer: {
  //   overflow: "hidden",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // height: 100,
  //   // width: 100,
  //   borderRadius: 15,
  // },
  image: { height: "100%", width: "100%", resizeMode: "cover" },
  category: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#444444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    lineHeight: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  button: {
    height: 50,
    borderRadius: 50,
    width: 200,
  },
});
