import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { getCategoriesDetails } from "@/store/Slices/CategoryDetailsSlice";
import { useNavigation } from "@react-navigation/native";

import Loading from "@/components/Loading";
import GoBack from "@/components/GoBack";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryDetails = () => {
  const route = useRoute();
  const { categoryName } = route.params;
  const dispatch = useDispatch();
  const { CategoriesDetails, loading, isError } = useSelector(
    (state) => state.categoriesDetails
  );
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategoriesDetails(categoryName));
  }, [dispatch, categoryName]);

  if (loading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg">
          Error loading categories: {isError.message || isError}
        </Text>
        <TouchableOpacity
          className="mt-4 px-4 py-2 bg-amber-500 rounded-lg"
          onPress={() => dispatch(getCategoriesDetails(categoryName))}
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!CategoriesDetails || CategoriesDetails.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">
          No meals found in the {categoryName} category.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">


      <Header title={categoryName} isMeals={true} />


      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between px-1">
          {CategoriesDetails.map((item) => (
            <TouchableOpacity
              key={item.idMeal}
              className="w-[48%] mb-4 bg-white rounded-lg shadow-sm shadow-amber-100 overflow-hidden"
              onPress={() =>
                navigation.navigate("details", { id: item.idMeal })
              }
              activeOpacity={0.8}
            >

              <View className="aspect-square bg-gray-200">
                <Image
                  source={{ uri: item.strMealThumb }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>


              <View className="p-3 bg-amber-500">
                <Text
                  className="text-gray-100 font-semibold text-center text-sm"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.strMeal}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetails;
