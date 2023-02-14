import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "native-base";
import ListingCard from "../components/ListingCard";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { useEffect } from "react";
import { getUserId } from "../helpers/util";

export default function History() {
  const [userId, setUserId] = useState(null);

  const userIdGetter = async () => {
    const data = await getUserId();
    setUserId(Number(data));
  };

  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  if (postsLoading) return <Loader />;
  if (postsError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");
  }

  const myListingPosts = postsData?.getAllPosts?.filter((myListing) => {
    return myListing?.status === "completed" && myListing?.giver_id == userId;
  });

  useEffect(() => {
    userIdGetter();
  }, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {myListingPosts?.map((post) => {
            return (
              <View key={post["_id"]} style={styles.viewContainer}>
                <ListingCard post={post} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  viewContainer: { paddingHorizontal: 40, justifyContent: "center", flexDirection: "row", alignItems: "center" },
});
