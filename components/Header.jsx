import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import GoBack from "./GoBack";
import { AntDesign } from "@expo/vector-icons";

const Header = ({ title, isMeals, isIcon }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <View className="bg-amber-500 shadow-sm  px-3 py-1">
      <View className="flex-row items-center justify-between">
        <GoBack color="white" />
        <Text className="text-white text-xl font-bold text-center ">
          {title} {isMeals ? "Meals" : ""}
        </Text>
        {isIcon ? (
          <TouchableOpacity
            accessibilityLabel="Toggle favorite"
            accessibilityRole="button"
            onPress={() => setIsFav(!isFav)}
            className="p-1"
          >
            <AntDesign name="heart" size={24} color={isFav ? "red" : "white"} />
          </TouchableOpacity>
        ) : (
          <Text className="text-transparent">..........</Text>
        )}
      </View>
    </View>
  );
};

export default Header;
