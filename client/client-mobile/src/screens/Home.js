import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ScrollView } from "native-base";
import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryHome";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { COLORS } from "../constants";

export default function Home({ navigation }) {
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };
  const logout = async () => {
    console.log("before", AsyncStorage.getItem("access_token"));
    await AsyncStorage.removeItem("access_token");
    console.log("after", AsyncStorage.getItem("access_token"));
  };
  const check = async () => {
    console.log(await AsyncStorage.getItem("access_token"));
    console.log(await AsyncStorage.getItem("appLaunched"));
  };
  const fetchCategory = () => {};

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((token) => console.log(">>>>>>", token));
  }, []);

  return (
    <SafeAreaView>
      {/* <Button onPress={}>Cek category</Button> */}
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView>
        <SearchBar />
        <Carousel />
        <CategoryList />

        <CardMenu />
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <Button onPress={check} style={styles.test}>
            Check
          </Button>
          <Button onPress={logout} style={styles.test}>
            Logout
          </Button>
          <Button onPress={clearAsyncStorage} style={styles.test}>
            Clear all storage
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  test: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
});
