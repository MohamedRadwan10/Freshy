import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/Slices/CategorySlice";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

const Categories = () => {
  const dispatch = useDispatch();
  const { Categories, loading, isError } = useSelector(
    (state) => state.categories
  );
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          Error loading categories: {isError}
        </Text>
      </View>
    );
  }

  if (Categories.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No categories available.</Text>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <Text className="text-2xl font-semibold  my-2 ">Food Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {Categories.map((category) => (
          <View key={category.idCategory} className="p-2">
            <TouchableOpacity
              className=" items-center "
              accessibilityLabel={`Category: ${category.strCategory}`}
              onPress={() =>
                navigation.navigate("categoryDetails", {
                  categoryName: category.strCategory,
                })
              }
            >
              <View className=" rounded-full  overflow-hidden  bg-gray-200">
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  className="rounded-full "
                  resizeMode="cover"
                  style={{ width: 75, height: 75 }}
                />
              </View>
              <Text className="mt-1 text-center font-medium text-sm">
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
