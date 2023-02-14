import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Button, FormControl, Modal, Input, ScrollView, Center, VStack, Slide, Box, useDisclose, Actionsheet, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

export default function PostCategory({}) {
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Center>
      <Text>Ini halaman Post Category</Text>
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}

      {/* Bottom Sheet */}
      {/* <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Pick a Category
            </Text>
          </Box> */}
      {/* Ini ntar flatlist dari category, sekarang HARDCODE DULU */}
      {/* <Actionsheet.Item
            onPress={() => {
              navigation.navigate("PostItem");
            }}
          >
            Plastic Packaging
          </Actionsheet.Item>
          <Actionsheet.Item>Carton Packaging</Actionsheet.Item>
          <Actionsheet.Item>Glass Packaging</Actionsheet.Item>
          <Actionsheet.Item>Aluminum Cans</Actionsheet.Item>
          <Actionsheet.Item>Paper/Cardboard</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet> */}
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
