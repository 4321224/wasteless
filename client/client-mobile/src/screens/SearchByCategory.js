import { Box, FlatList, ScrollView, Text, View } from "native-base";
import SearchBar from "../components/SearchBar";
import CategorySearch from "../components/ItemCardLarge";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_CATEGORY } from "../query/Posts";
import ItemCardSmall from "../components/ItemCardSmall";
import React, { useEffect, useState } from "react";

export default function Categories({ route }) {
  const { categoryId } = route.params;

  const { data: postsByCategoryData, loading: postsByCategoryLoading, error: postByCategoryError } = useQuery(GET_POST_BY_CATEGORY, { variables: { categoryId } });

  const [userLoc, setUserLoc] = useState("");

  const [userLatLon, setUserLatLon] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        } else {
          Geocoder.init("AIzaSyCVVWasvqI_muG_92Mdo63Ik14SZ6bLlCo", {
            language: "id",
          });
          let location = await Location.getCurrentPositionAsync();

          setUserLatLon({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });

          const loc = await Geocoder.from(location.coords.latitude, location.coords.longitude);

          setUserLoc(loc.results[0].address_components.find((el) => el.types[0] === "administrative_area_level_4").long_name + ", " + loc.results[0].address_components.find((el) => el.types[0] === "administrative_area_level_1").long_name);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (postByCategoryError) {
    console.log("postByCategoryError ---------------------");
    console.log(postByCategoryError);
    console.log("postByCategoryError ---------------------");
  }
  if (postsByCategoryLoading) return <Loader />;

  // console.log(postsByCategoryData?.getPostByCategory);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <SafeAreaView>
        {/* <Text>INI HOME!</Text> */}
        {/* <CategorySearch /> */}
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Category Filter:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
              {postsByCategoryData?.getPostByCategory?.map((post) => (
                <ItemCardSmall post={post} key={post["_id"]} userLatLon={userLatLon} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
