import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Button,
  Center,
  Collapse,
  Skeleton,
  Avatar,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import latlngDist from "latlng-distance";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { GET_CATEGORIES } from "../query/Categories";
import { GET_PROFILE, GET_USER_DETAIL } from "../query/Users";
import CardBanner from "../components/CardBanner";
import ItemCardSmall from "../components/ItemCardSmall";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import { capitalize, getToken, getUserId, signOut } from "../helpers/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import { COLORS } from "../constants";

export default function NewHome({ navigation }) {
  const dummyLoader = ["a", "b", "c", "d", "e", "f", "g"];
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };
  const logout = async () => {
    console.log("before", AsyncStorage.getItem("access_token"));
    await signOut("access_token");
    console.log("after", AsyncStorage.getItem("access_token"));
  };
  const check = async () => {
    console.log(await getToken("access_token"));
    console.log(await getToken("userId"));
  };

  //? SERVER WIRING
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_POSTS);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORIES);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_PROFILE);

  if (postsError || categoryError || userError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");

    console.log("categoryError -----------------------");
    console.log(categoryError);
    console.log("categoryError -----------------------");

    console.log("userData -----------------------");
    console.log(userError);
    console.log("userData -----------------------");
  }

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (val) => setSearch(val);

  const getFilteredPost = () => {
    if (search) {
      return filtered;
    }
    return postsData?.getAllPosts;
  };

  const handleOnSubmit = () => {
    setFiltered(
      postsData?.getAllPosts?.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFiltered(
      postsData?.getAllPosts?.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  // if (postsLoading || categoryLoading || userLoading) return <Loader />;

  // console.log(postsLoading);

  const [userLoc, setUserLoc] = useState("");
  const [userLatLon, setUserLatLon] = useState({});

  // console.log(userLoc);

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
          // console.log(loc.results[0].address_components);

          setUserLoc(
            loc.results[0].address_components.find(
              (el) => el.types[0] === "administrative_area_level_4"
            ).long_name +
              ", " +
              loc.results[0].address_components.find(
                (el) => el.types[0] === "administrative_area_level_1"
              ).long_name
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <View style={{ backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SafeAreaView>
        {/* Loader */}
        {/* <Skeleton.Text isLoaded={!postsLoading} /> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Button onPress={check} style={styles.test}>
            Check
          </Button>
          <Button onPress={logout} style={styles.test}>
            Logout
          </Button>
          <Button onPress={clearAsyncStorage} style={styles.test}>
            Clear all storage
          </Button> */}
          <View
            style={{
              backgroundColor: COLORS.primary,
              paddingTop: 20,
              paddingBottom: 10,
              paddingHorizontal: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                {userLoading ? (
                  <Skeleton.Text isLoaded={!userLoading} lines={2} w={200} />
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: COLORS.lightGrey,
                      }}
                    >
                      Welcome {capitalize(userData?.getProfile?.username)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                        paddingRight: 10,
                      }}
                    >
                      <Ionicons
                        name="location"
                        size={24}
                        color={COLORS.lightGrey}
                      />
                      {/* <Text style={{ color: COLORS.lightGrey, marginLeft: 10, marginRight: 10 }}>Pondok Indah, Jakarta Selatan</Text> */}
                      <Text
                        style={{
                          color: COLORS.lightGrey,
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        {userLoc}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <View>
                {/* <Button
                  onPress={() => navigation.navigate("MyProfile")}
                  variant="unstyled"
                  style={{
                    backgroundColor: COLORS.accent,
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    shadowColor: COLORS.primaryShade[500],
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                >
                  <Feather name="user" size={24} color={COLORS.dark} />
                </Button> */}
                <Pressable onPress={() => navigation.navigate("MyProfile")}>
                  <Avatar size={"50px"} bg={COLORS.accent}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: COLORS.dark,
                      }}
                    >
                      {capitalize(userData?.getProfile?.username).charAt(0)}
                    </Text>
                  </Avatar>
                </Pressable>
              </View>
            </View>

            {/* Search Bar */}
            <SearchBar
              search={search}
              handleSearchChange={handleSearchChange}
              handleOnSubmit={handleOnSubmit}
            />
          </View>
          <View style={{ backgroundColor: COLORS.primary }}>
            <View
              style={{
                paddingTop: 10,
                backgroundColor: COLORS.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                // paddingHorizontal: 20,
              }}
            >
              {/* <CardBanner /> */}
              <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                <Carousel />
              </View>

              {/* Category Card */}
              <View style={{ marginVertical: 10 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ flexDirection: "row" }}>
                    {categoryLoading
                      ? dummyLoader.map((dummy) => (
                          <View key={dummy} style={styles.categoryCard}>
                            <Skeleton.Text
                              isLoaded={!categoryLoading}
                              lines={1}
                              w={75}
                            />
                          </View>
                        ))
                      : categoryData?.getAllCategories?.map((item) => {
                          return (
                            <CategoryCard
                              key={item["_id"]}
                              item={item}
                              categoryId={item["_id"]}
                            />
                          );
                        })}
                  </View>
                </ScrollView>
              </View>

              {/* Card */}
              <View
                style={{ flex: 1, marginVertical: 20, paddingHorizontal: 20 }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}
                >
                  Near Me
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                  }}
                >
                  {postsLoading
                    ? dummyLoader.map((dummy) => (
                        <View key={dummy} style={styles.buttonContainer}>
                          <TouchableOpacity>
                            <View
                              style={{
                                width: 150,
                                height: 150,
                                overflow: "hidden",
                                borderRadius: 20,
                              }}
                            >
                              <Skeleton
                                isLoaded={!postsLoading}
                                h={"full"}
                                w={"full"}
                              />
                              {/* <Image source={{ uri: post.mainImage }} style={{ width: 150, height: 150 }} /> */}
                            </View>
                            <View
                              style={{ marginVertical: 10, flexWrap: "wrap" }}
                            >
                              <Skeleton.Text
                                isLoaded={!postsLoading}
                                lines={2}
                              />
                              {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Ionicons name="location" size={18} color={COLORS.primaryShade[400]} />
                          </View> */}
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    : getFilteredPost()?.map((post) => {
                        return (
                          <ItemCardSmall
                            post={post}
                            key={post["_id"]}
                            postsLoading={postsLoading}
                            userLatLon={userLatLon}
                          />
                        );
                      })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Rizqi punya, pindah ke card small
{
  /* <Text>
                            {Math.round(
                              latlngDist.distanceDiffInKm(userLatLon, {
                                lat: -6.001,
                                lon: 107.001,
                              }) * 100
                            ) / 100}{" "}
                            Km
                          </Text> */
}

const styles = StyleSheet.create({
  buttonContainer: {
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
  categoryCard: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.lightGrey,
    marginLeft: 20,
    padding: 10,
    borderRadius: 15,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 15,
    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
