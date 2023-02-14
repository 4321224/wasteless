import { Box, FlatList, ScrollView } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import AllCategory from "../components/CategoryCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../query/Categories";
import CategoryCard from "../components/CategoryCard";
import { useEffect, useState } from "react";
import { Pressable, TextInput, Text, View, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GET_POSTS, GET_POST_BY_CATEGORY } from "../query/Posts";
import ItemCardSmall from "../components/ItemCardSmall";
import { COLORS } from "../constants";

export default function CategoryScreen() {
  // const locations = ["Plastic", "Cardboard", "Paper", "Alumunium can", "Glass"];
  // <StatusBar barStyle="light-content" backgroundColor={COLORS.white} />;

  const { loading: postCategoryLoading, error: postCategoryError, data: postCategoryData } = useQuery(GET_POST_BY_CATEGORY);
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);
  if (postsError || categoryError || postCategoryError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");

    console.log("categoryError -----------------------");
    console.log(categoryError);
    console.log("categoryError -----------------------");

    console.log("postCategoryError -----------------------");
    console.log(postCategoryError);
    console.log("postCategoryError -----------------------");
  }

  // const [categoryFilter, setCategoryFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (val) => setSearch(val);

  const getFilteredPost = () => {
    if (search) {
      return filtered;
    }
    return postsData?.getAllPosts;
  };

  const handleOnSubmit = () => {
    setFiltered(postsData?.getAllPosts?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  };

  useEffect(() => {
    setFiltered(postsData?.getAllPosts?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  if (postsLoading || categoryLoading || postCategoryError) return <Loader />;
  // console.log(filtered);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* Search Bar */}
          <View style={{ paddingHorizontal: 20 }}>
            <SearchBar search={search} handleSearchChange={handleSearchChange} handleOnSubmit={handleOnSubmit} />
          </View>

          {/* Category Card */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 10 }}>All Categories</Text>
            <View style={{ marginVertical: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {categoryData?.getAllCategories?.map((item) => {
                  return <CategoryCard key={item["_id"]} item={item} categoryId={item["_id"]} />;
                })}
              </View>
            </View>
          </View>

          {/* Searched Posts */}
          {search ? (
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>Search: {search}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {getFilteredPost()?.map((post) => {
                  return <ItemCardSmall post={post} key={post["_id"]} />;
                })}
              </View>
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </View>
  );
}
