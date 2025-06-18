import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchMealDetails } from "@/store/Slices/DetailsSlice";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MiscDetails from "@/components/MiscDetails";
import YoutubeIframe from "react-native-youtube-iframe";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

const MealDetails = () => {

  const [playing, setPlaying] = useState(false);
  const route = useRoute();
  const { id } = route.params || {};
  const dispatch = useDispatch();
  const { meal, status, error } = useSelector((state) => state.mealDetails);


  if (!id) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="text-red-500 text-lg font-medium">
          Error: Missing meal ID
        </Text>
      </View>
    );
  }

  useEffect(() => {
    dispatch(fetchMealDetails(id));
  }, [id, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="text-gray-600 text-lg font-medium">
          Meal not found
        </Text>
      </View>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match?.[1] || null;
  };

  const youtubeId = extractYoutubeId(meal?.strYoutube);

  return (
    <SafeAreaView className="flex-1 pb-5 bg-white">
      <Header isMeals={true} isIcon={true} />

      <ScrollView
        className="flex-1 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal:15 }}
      >
        <StatusBar style="light" />
        <View className="">
          <Image
            source={{ uri: meal.strMealThumb }}
            className="w-full h-80 rounded-lg shadow-md"
            resizeMode="cover"
          />

          <Text className="text-3xl font-bold mt-4 mb-4 text-gray-800">
            {meal.strMeal}
          </Text>

          <View className="flex-row mb-6">
            <View className="mr-6">
              <Text className="text-lg font-semibold text-gray-800">
                Category
              </Text>
              <Text className="text-gray-700 text-base">
                {meal.strCategory}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-gray-800">Area</Text>
              <Text className="text-gray-700 text-base">{meal.strArea}</Text>
            </View>
          </View>

          <MiscDetails />

          <View className="mb-8">
            <Text className="text-2xl font-bold mb-4 text-amber-800">
              Ingredients
            </Text>

            <View className="bg-amber-50 rounded-xl p-4 shadow-sm">
              {ingredients.map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between  gap-5 mb-3 p-2 bg-white rounded-lg shadow-xs"
                >
                  <View className="bg-amber-100 p-2 rounded-full  ">
                    <FontAwesome5 name="carrot" size={20} color="#b45309" />
                  </View>

                  <View className="flex-1 ">
                    <Text className="text-base font-semibold text-gray-800">
                      {item.ingredient}
                    </Text>
                    <Text className="text-sm text-amber-700">
                      {item.measure}
                    </Text>
                  </View>

                  <TouchableOpacity className="p-2">
                    <Ionicons
                      name="checkbox-outline"
                      size={20}
                      color="#d97706"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-2 text-gray-800">
              Instructions
            </Text>
            {meal.strInstructions
              .split("\r\n")
              .filter((p) => p.trim())
              .map((paragraph, index) => (
                <Text key={index} className="text-gray-700 mb-2 text-base">
                  {paragraph}
                </Text>
              ))}
          </View>

          {youtubeId && (
            <View className=" pb-5">
              <Text className="text-xl font-semibold mb-3 text-gray-800">
                Video Tutorial
              </Text>
              <View className=" rounded-2xl overflow-hidden aspect-video" style={{height:195}}>
                <YoutubeIframe
                  videoId={youtubeId}
                  height={"100%"}
                  play={playing}
                  onChangeState={(event) => {
                    if (event === "ended") {
                      setPlaying(false);
                    }
                  }}
                  webViewProps={{
                    androidLayerType: "hardware",
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealDetails;
