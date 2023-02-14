import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  VStack,
  Stack,
  Badge,
  ScrollView,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";

const CategoryList = () => {
  return (
    <ScrollView>
      <View>
        <HStack justifyContent="center" space="3" marginTop="3">
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
            }}
          >
            AJ
          </Avatar>
          <Avatar
            bg="gren.500"
            size="lg"
            source={{
              uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
            }}
          >
            TE
          </Avatar>
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
            }}
          >
            JB
          </Avatar>
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
            }}
          >
            TS
          </Avatar>
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
            }}
          >
            TS
          </Avatar>
        </HStack>
      </View>
    </ScrollView>
  );
};

export default CategoryList;
