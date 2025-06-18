import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHome } from "@/store/Slices/HomeSlice";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

const HomeMeals = () => {
  const dispatch = useDispatch();
  const { Home, loading, isError } = useSelector((state) => state.home);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getHome());
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

  if (Home.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No categories available.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <Text className="text-2xl font-semibold mb-4">Recipes</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >

        <View className="flex flex-row flex-wrap ">
          {Home.map((item) => (
            <TouchableOpacity
              key={item.idMeal}
              style={{ width: "50%", padding: 8 }}
              accessibilityLabel={`Category: ${item.strCategory}`}
              onPress={() =>
                navigation.navigate("details", { id: item.idMeal })
              }
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeMeals;
