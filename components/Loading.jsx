import { View, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View className="flex-1 bg-white  justify-center items-center">
      <ActivityIndicator size="large" color={"#eab308"} />
    </View>
  );
};

export default Loading;
