// Search.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setQuery,
  clearResults,
  fetchSearchResults,
} from "@/store/Slices/SearchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { results, loading, isError, query, page } = useSelector(
    (state) => state.search
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults({ query, page }));
    }
  }, [query, page, dispatch]);

  const handleSearch = (text) => {
    dispatch(setQuery(text));
  };

  const clearSearch = () => {
    dispatch(clearResults());
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1">
      <View className="mx-5 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Recipe"
          placeholderTextColor="gray"
          className="p-4 flex-1 rounded-full rounded-r-none text-base font-semibold text-gray-800"
          value={query}
          onChangeText={handleSearch}
          accessibilityLabel="Search input"
          accessibilityHint="Enter a recipe name to search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            className="p-2"
            accessibilityLabel="Clear search"
            accessibilityHint="Clears the search input"
          >
            <AntDesign name="closecircle" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="space-y-5"
      >
        {loading ? (
          <Loading />
        ) : isError ? (
          <Text className="text-gray text-center">{isError}</Text>
        ) : results.length === 0 && query.length > 0 ? (
          <Text className="text-gray text-center">No results found</Text>
        ) : (
          <>
            {query && (
              <>
                <Text className="text-gray-700 font-semibold text-xl ml-1 my-5">
                  Results ({results.length})
                </Text>

                <View className="flex flex-row flex-wrap ">
                  {results.map((item) => (
                    <Pressable
                      key={item.idMeal}
                      onPress={() =>
                        navigation.navigate("details", { id: item.idMeal })
                      }
                      style={{ width: "50%", padding: 8 }}
                    >
                      <View className="space-y-2">
                        <Image
                          className="rounded-xl"
                          source={{ uri: item.strMealThumb }}
                          style={{ width: "100%", aspectRatio: 2 / 3 }}
                        />
                        <Text className="text-gray-900 ml-1 truncate">
                          {item.strMeal.length > 22
                            ? item.strMeal.slice(0, 22) + "..."
                            : item.strMeal}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;
