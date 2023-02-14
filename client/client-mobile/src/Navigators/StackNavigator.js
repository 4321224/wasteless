import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import MapDirection from "../screens/MapDirection";
import Maps from "../screens/Maps";
import { COLORS } from "../constants";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    <Stack.Navigator
      initialRouteName={firstLaunch ? "Onboarding" : "Tab"}
      screenOptions={{
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTitleStyle: {
          color: COLORS.dark,
          fontSize: 20,
          fontWeight: "600",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
