import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Box,
  Heading,
  HStack,
  Avatar,
  VStack,
  Text,
  Spacer,
} from "native-base";

export default function HistoryLogs() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "TransactionID",
      timeStamp: "12:47 PM",
      recentText: "Description",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "TransactionIDur",
      timeStamp: "11:11 PM",
      recentText: "Description",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "TransactionID",
      timeStamp: "6:22 PM",
      recentText: "Description",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "TransactionID",
      timeStamp: "8:56 PM",
      recentText: "Description",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "TransactionID",
      timeStamp: "12:47 PM",
      recentText: "Description",
    },
  ];
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        History Logs
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between" padding={2}>
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.fullName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    flex: 1,
    // alignItems: "center",
  },
});
