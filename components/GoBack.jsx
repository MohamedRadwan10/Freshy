import { View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GoBack = ({ color }) => {
  const navigation = useNavigation();
  return (
    <View className="">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className=" p-1  items-center "
      >
        <AntDesign name="leftcircle" size={30} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default GoBack;
