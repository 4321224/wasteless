import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
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
import { db } from "../configs/firebase";

export default function Notifications({ navigation }) {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  const [notifications, setNotifications] = useState([]);

  async function observer() {
    const user1 = "giver";
    const user2 = "taker";

    const colls = db.collection("chats");
    const docs = await colls
      .where("user1", "in", [user1, user2])
      .orderBy("timeStamp", "desc");

    const today = new Date();

    const observer = docs.onSnapshot(
      (querySnapshot) => {
        setNotifications(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              user:
                doc.data().user1 == user1 ? doc.data().user2 : doc.data().user1,
              lastMsg: doc.data().lastMsg,
              timeStamp:
                doc.data().timeStamp.toDate().getTime() >
                today.setHours(0, 0, 0, 0)
                  ? doc.data().timeStamp.toDate().getHours() +
                    ":" +
                    doc.data().timeStamp.toDate().getMinutes()
                  : doc.data().timeStamp.toDate().getDate() +
                    "/" +
                    (doc.data().timeStamp.toDate().getMonth() + 1) +
                    "/" +
                    doc.data().timeStamp.toDate().getFullYear(),
            };
          })
        );
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    // setNotifications(arr);
  }

  useEffect(() => {
    observer();
  }, []);

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("Chat")}>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "muted.50",
              }}
              borderColor="muted.400"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
              marginY={1}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="48px"
                  marginLeft={4}
                  marginRight={2}
                  // source={{
                  //   uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  // }}
                >
                  {item.user.charAt(0).toUpperCase()}
                </Avatar>
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.user}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.lastMsg}
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
                  marginRight={3}
                  paddingTop={1}
                >
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>
          </Pressable>
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
