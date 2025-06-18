import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getIngredient } from "@/store/Slices/IngredientSlice";
import Header from "@/components/Header"
import Loading from "@/components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";



const Ingredient = () => {
  const { Ingredient, loading, isError } = useSelector(
    (state) => state.ingredient
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getIngredient());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <View className="bg-red-500 p-4 rounded-lg">
          <Text className="text-white">
            Failed to fetch ingredients. Please try again.
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(getIngredient())}
            className="mt-2 p-2 bg-white rounded"
          >
            <Text className="text-red-500">Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!Ingredient?.length) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500">No ingredients found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      <Header title = "Ingredient" isMeals={true} />

      <ScrollView
        contentContainerClassName="flex-row flex-wrap justify-between p-4"
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        {Ingredient.map((item, index) => (
          <TouchableOpacity
            key={item.strIngredient || `ingredient-${index}`}
            className="w-[48%] bg-white rounded-lg p-4 mb-4 items-center shadow-sm shadow-black"
            onPress={() =>
              navigation.navigate("ingredientDetails", {
                ingredientName: item.strIngredient,
              })
            }
          >
            <View className="bg-amber-100 w-12 h-12 rounded-full justify-center items-center mb-2">
              <MaterialIcons name="fastfood" size={24} color="#dc9015" />
            </View>
            <Text
              className="text-base font-medium text-gray-800 text-center"
              numberOfLines={1}
            >
              {item.strIngredient}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Ingredient;
