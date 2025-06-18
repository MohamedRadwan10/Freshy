import { View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { AntDesign } from "@expo/vector-icons";
const MiscDetails = () => {
  return (
    <View className="flex-row justify-around my-4">
      <View className="flex rounded-full bg-amber-400 p-2">
        <View
          style={{ width: 60, height: 60 }}
          className="bg-white rounded-full flex justify-center items-center"
        >
          <AntDesign name="clockcircleo" size={30} color="black" />
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">
            {Math.floor(Math.random() * 41) + 20}
          </Text>
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">Mins</Text>
        </View>
      </View>
      <View className="flex rounded-full bg-amber-400 p-2">
        <View
          style={{ width: 60, height: 60 }}
          className="bg-white rounded-full flex justify-center items-center"
        >
          <FontAwesome5 name="user-friends" size={30} color="black" />
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">
            {Math.floor(Math.random() * 301)}
          </Text>
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">Servings</Text>
        </View>
      </View>
      <View className="flex rounded-full bg-amber-400 p-2">
        <View
          style={{ width: 60, height: 60 }}
          className="bg-white rounded-full flex justify-center items-center"
        >
          <MaterialIcons name="local-fire-department" size={32} color="black" />
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">
            {Math.ceil(Math.random() * 501)}
          </Text>
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">Cal</Text>
        </View>
      </View>
      <View className="flex rounded-full bg-amber-400 p-2">
        <View
          style={{ width: 60, height: 60 }}
          className="bg-white rounded-full flex justify-center items-center"
        >
          <Octicons name="stack" size={30} color="black" />
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold"></Text>
        </View>
        <View className="flex items-center py-1">
          <Text className="text-neutral-700 font-bold">Easy</Text>
        </View>
      </View>
    </View>
  );
};

export default MiscDetails;
