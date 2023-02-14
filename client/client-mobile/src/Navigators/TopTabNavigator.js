import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyListing from "../screens/MyListing";
import History from "../screens/History";
import { COLORS } from "../constants";
import OngoingOrder from "../screens/OngoingOrder";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator initialLayout="MyListing" screenOptions={{ tabBarLabelStyle: { textTransform: "none" }, headerShadowVisible: false, tabBarPressColor: COLORS.lightGrey, tabBarIndicatorStyle: { backgroundColor: COLORS.primary } }}>
      <TopTab.Screen name="MyListing" component={MyListing} options={{ title: "My Listings" }} />
      <TopTab.Screen name="Ongoing" component={OngoingOrder} options={{ title: "Ongoing" }} />
      <TopTab.Screen name="History" component={History} options={{ title: "History" }} />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({});
