import { StyleSheet, Text, View, Image } from "react-native";
import { FlatList, Button, Center } from "native-base";
import React from "react";

export default function CardBanner() {
  return (
    <Center style={{ marginVertical: 10 }}>
      <View style={{ width: "100%", height: 150, overflow: "hidden", borderRadius: 20 }}>
        <Image source={{ uri: "http://placekitten.com/500/200" }} style={{ flex: 1 }} resizeMode="cover" />
      </View>
    </Center>
  );
}

const styles = StyleSheet.create({});
