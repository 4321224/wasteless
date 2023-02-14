import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spinner, Stack } from "native-base";

export default function Loader() {
  return (
    <View style={{ flex: 1 }}>
      <View justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
