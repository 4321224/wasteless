import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

export default function QR() {
  // const {id} = // dari props flatlist

  const handleQrRoute = (id) => {
    // console.log(id);
  };
  return (
    <Box style={styles.qrContainer}>
      <Button style={styles.button}>
        <Ionicons name="qr-code" size={24} color="black" />
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    marginLeft: 10,
    marginTop: 30,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    backgroundColor: COLORS.white,
    // borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
