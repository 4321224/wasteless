import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

export default function CategoryCard({ item, categoryId }) {
  const navigation = useNavigation();

  const handleCategoryNavigate = () => {
    // console.log(categoryId);
    navigation.navigate("SearchByCategory", { categoryId, name: item.name });
  };

  return (
    <TouchableOpacity onPress={handleCategoryNavigate}>
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          marginLeft: 20,
          padding: 10,
          borderRadius: 15,
          height: 40,
          marginBottom: 10,
          paddingHorizontal: 15,
          shadowColor: COLORS.primaryShade[500],
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
    // <Text>{item.name}</Text>
  );
}

const styles = StyleSheet.create({});
