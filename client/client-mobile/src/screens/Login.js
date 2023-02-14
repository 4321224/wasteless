import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";
import { Button, Pressable, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { getToken } from "../helpers/util";

export default function Login({ navigation }) {
  const check = async () => {
    console.log(await getToken("access_token"));
    console.log(await getToken("userId"));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* <Button onPress={check} style={styles.test}>
          Check
        </Button> */}
        {/* Status Bar */}
        <StatusBar barStyle="light-content" backgroundColor="#339966" />

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 40 }}>
          <View>
            <Text style={styles.title}>Hello Again</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.welcomeText}>We are here to help you</Text>
            <Text style={styles.welcomeText2}>build a recycling habit!</Text>
          </View>

          <FormUser page={"Login"} navigation={navigation} />

          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <Text style={styles.signup}>Not registered yet? Sign up </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={styles.button}>here.</Text>
            </Pressable>
          </View>

          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <Pressable onPress={() => navigation.replace("Tab")}>
              <Text style={styles.button}>Backdoor Home</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    marginTop: 15,
    fontSize: 16,
  },
  welcomeText2: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
  },
  signup: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
});
