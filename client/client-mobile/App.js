import React, { useEffect, useState } from "react";
import { Text, Link, HStack, Center, Heading, Switch, useColorMode, NativeBaseProvider, extendTheme, VStack, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import StackNavigator from "./src/Navigators/StackNavigator";
import client from "./src/configs/apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "./src/constants";

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.white,
    },
  };

  return (
    firstLaunch != null && (
      <ApolloProvider client={client}>
        <NativeBaseProvider>
          <NavigationContainer theme={MyTheme}>
            <StackNavigator firstLaunch={firstLaunch} />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
    )
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch isChecked={colorMode === "light"} onToggle={toggleColorMode} aria-label={colorMode === "light" ? "switch to dark mode" : "switch to light mode"} />
      <Text>Light</Text>
    </HStack>
  );
}
