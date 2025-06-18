import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getArea } from "@/store/Slices/AreaSlice";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Area = () => {
  const { Area, loading, isError, errorMessage } = useSelector((state) => state.area);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getArea());
  }, [dispatch]); 

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", errorMessage || "An error occurred while fetching data.");
    }
  }, [isError, errorMessage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Area" isMeals={true} />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex flex-row flex-wrap -mx-2">
          {Area?.map((product) => (
            <View key={product.strArea} className="w-1/2 p-2">
              <TouchableOpacity
                className="bg-gray-100 rounded-lg p-4 items-center"
                onPress={() =>
                  navigation.navigate("areaDetails", {
                    areaName: product.strArea,
                  })
                }
              >
                <Text className="text-2xl text-gray-500 mb-2">🌎</Text>
                <Text className="text-lg font-bold text-center">
                  {product.strArea}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Area;