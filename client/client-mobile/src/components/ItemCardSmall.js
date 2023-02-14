import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { Skeleton } from "native-base";
import latlngDist from "latlng-distance";

export default function ItemCardSmall({ post, postsLoading, userLatLon }) {
  // console.log(post);
  const navigation = useNavigation();
  // console.log(post["_id"]);
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { id: post["_id"] })}>
        <View style={{ width: 150, height: 150, overflow: "hidden", borderRadius: 20 }}>
          <Skeleton isLoaded={!postsLoading} h={"full"} w={"full"} />
          <Image source={{ uri: post.mainImage }} style={{ width: 150, height: 150 }} />
        </View>
        <View style={{ marginVertical: 10, flexWrap: "wrap" }}>
          <Skeleton.Text isLoaded={!postsLoading} />
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Ionicons name="location" size={18} color={COLORS.primaryShade[400]} />
            <Text>
              {Math.round(
                latlngDist.distanceDiffInKm(userLatLon, {
                  lat: +post.lat,
                  lon: +post.long,
                }) * 100
              ) / 100}{" "}
              Km
            </Text>
            {/* <Text>Lat: {post.lat} </Text>
            <Text>Long: {post.long}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor: COLORS.white,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    marginHorizontal: 7.5,
    padding: 10,
    borderRadius: 20,

    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
