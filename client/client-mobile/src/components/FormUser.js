import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, FormControl, Icon, Input, Pressable, Stack, WarningOutlineIcon, Button, Center, Heading, VStack, Link, HStack, Text, TextArea } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { POST_REGISTER, POST_LOGIN } from "../query/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, signIn } from "../helpers/util";
// -------------------------------------------------------------------

const { height, width } = Dimensions.get("screen");

export default function FormUser({ page, navigation }) {
  const [show, setShow] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleEmailChange = (val) => setEmail(val);
  const handlePasswordChange = (val) => setPassword(val);
  const handleUsernameChange = (val) => setUsername(val);
  const handlePhoneNumberChange = (val) => setPhoneNumber(val);
  const handleAddressChange = (val) => setAddress(val);

  const [register, { data: registerData, loading: registerLoading, error: registerError }] = useMutation(POST_REGISTER);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(POST_LOGIN);

  // if (registerLoading || loginLoading) return <Text>Loading....</Text>;
  if (registerError || loginError) {
    console.log("registerError ------------------------");
    console.log(registerError);
    console.log("registerError ------------------------");
    console.log();
    console.log("loginError ---------------------------");
    console.log(loginError);
    console.log("loginError ---------------------------");
    // return <Text>Error: {registerError ? registerError : loginError}</Text>;
  }

  const handleSubmitLogin = async () => {
    try {
      const userPayload = {
        email,
        password,
      };

      console.log(userPayload);

      await login({
        variables: { userPayload },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitRegister = async () => {
    try {
      const userPayload = {
        email,
        password,
        username,
        phoneNumber,
        address,
      };
      // console.log(userPayload);
      await register({
        variables: { userPayload },
      });

      navigation.navigate("Login");

      // Reset form
      setEmail("");
      setPassword("");
      setUsername("");
      setPhoneNumber("");
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };

  const handlerShowPassword = () => {
    show ? setShow(false) : setShow(true);
  };

  const handleLogin = async () => {
    const access_token = loginData?.loginUser?.access_token;
    const userId = loginData?.loginUser?.id;
    // // console.log(access_token);

    await signIn(access_token, userId);
    navigation.navigate("Tab");
  };

  useEffect(() => {
    if (loginData) {
      handleLogin();
    }
  }, [loginData]);

  return (
    <>
      {/* Login Form */}
      {page === "Login" && (
        <View>
          <Box style={styles.card}>
            <Stack space={10} w={width * 0.7} mx="auto" style={{ alignItems: "center" }}>
              {/* <Text bold fontSize="lg">
                Enter your login details to continue
              </Text> */}

              <Input type="email" placeholder="Enter your email here" onChangeText={handleEmailChange} value={email} size="lg" borderRadius={12} height={75} variant="filled" InputRightElement={<Icon as={<MaterialIcons name="email" />} size={8} mr="3" color={COLORS.primaryShade[100]} />} />

              <Input
                type={show ? "text" : "password"}
                placeholder="Enter your password here"
                onChangeText={handlePasswordChange}
                value={password}
                size="lg"
                borderRadius={12}
                height={75}
                borderColor={COLORS.lightGrey}
                background={"white"}
                backgroundColor={COLORS.lightGrey}
                InputRightElement={
                  <Pressable onPress={handlerShowPassword}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={8} mr="3" color={COLORS.primaryShade[100]} />
                  </Pressable>
                }
              />
              <Button isLoading={loginLoading ? true : false} isLoadingText={loginLoading ? "Signing in" : ""} colorScheme="indigo" onPress={handleSubmitLogin} style={styles.button}>
                Sign in
              </Button>
            </Stack>
          </Box>
        </View>
      )}

      {/* Register Form */}
      {page === "Register" && (
        <View>
          <Box style={styles.card2}>
            <Stack space={10} w={width * 0.7} maxW="500px" mx="auto" style={{ alignItems: "center", paddingVertical: 25 }}>
              <Input type="text" placeholder="Enter your username here" onChangeText={handleUsernameChange} value={username} size="lg" borderRadius={12} height={75} variant="filled" InputRightElement={<Icon as={<MaterialIcons name="person" />} size={8} mr="3" color={COLORS.primaryShade[100]} />} />

              <Input type="email" placeholder="Enter your email here" onChangeText={handleEmailChange} value={email} size="lg" borderRadius={12} height={75} variant="filled" InputRightElement={<Icon as={<MaterialIcons name="email" />} size={8} mr="3" color={COLORS.primaryShade[100]} />} />

              <Input
                type={show ? "text" : "password"}
                placeholder="Enter your password here"
                onChangeText={handlePasswordChange}
                value={password}
                size="lg"
                borderRadius={12}
                height={75}
                borderColor={COLORS.lightGrey}
                background={"white"}
                backgroundColor={COLORS.lightGrey}
                InputRightElement={
                  <Pressable onPress={handlerShowPassword}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={8} mr="3" color={COLORS.primaryShade[100]} />
                  </Pressable>
                }
              />

              <Input type="text" placeholder="Enter your phoneNumber here" onChangeText={handlePhoneNumberChange} value={phoneNumber} size="lg" borderRadius={12} height={75} variant="filled" InputRightElement={<Icon as={<MaterialIcons name="phone" />} size={8} mr="3" color={COLORS.primaryShade[100]} />} />

              <TextArea type="text" placeholder="Enter your address here" onChangeText={handleAddressChange} value={address} size="lg" borderRadius={12} variant="filled" InputRightElement={<Icon as={<MaterialIcons name="location-pin" />} size={8} mr="3" color={COLORS.primaryShade[100]} />} />

              <Button isLoading={registerLoading ? true : false} isLoadingText={registerLoading ? "Signing in" : ""} onPress={handleSubmitRegister} style={styles.button}>
                Sign up
              </Button>
            </Stack>
          </Box>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    // height: width * 0.8,
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card2: {
    marginTop: 40,
    // height: width * 0.9,
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    // marginTop: 20,
    height: 75,
    borderRadius: 50,
    width: 200,
    backgroundColor: COLORS.primary,

    shadowColor: COLORS.primaryShade[400],
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10,
  },
});
