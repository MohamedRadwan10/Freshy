import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Results = ({ data }) => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerClassName="p-2.5">
      <View className="flex-row flex-wrap justify-between">
        {data?.map((product, index) => (
          <TouchableOpacity
            key={product.idMeal || `${product.strIngredient}-${index}`}
            className="w-[48%] mb-4"
            onPress={() =>
              navigation.navigate("details", { id: product.idMeal })
            }
          >
            <View className="relative rounded-lg overflow-hidden">
              <Image
                className="w-full h-40"
                source={{ uri: product.strMealThumb }}
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/50 justify-center items-center">
                <Text
                  className="text-white font-bold text-center p-1.5"
                  numberOfLines={2}
                >
                  {product.strMeal?.split(" ").slice(0, 5).join(" ")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Results;
