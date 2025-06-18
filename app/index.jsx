import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import food from "../assets/images/food.jpg";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


const WelcomeScreen = () => {
  const navigation = useNavigation();

  //   Animated.parallel([
  //     Animated.spring(scaleValue, {
  //       toValue: 1,
  //       friction: 4,
  //       tension: 0,
  //       useNativeDriver: true,
  //     }),

  //     Animated.timing(fadeValue, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),

  //     Animated.timing(slideValue, {
  //       toValue: 0,
  //       duration: 800,
  //       easing: Easing.out(Easing.exp),
  //       useNativeDriver: true,
  //     }),

  //     Animated.timing(buttonSlideValue, {
  //       toValue: 0,
  //       duration: 800,
  //       delay: 300,
  //       easing: Easing.out(Easing.exp),
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // }, []);

  const handleLoginPress = () => {
    navigation.navigate("login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("home");
  };

  return (
    <SafeAreaView className="flex-1  bg-amber-500">
      <StatusBar style="light" />

      <View className="flex-1 justify-center items-center  ">
        <View className="bg-white/20 rounded-full p-8">
          <View className="bg-white/15 rounded-full p-8 overflow-hidden">
            <Image
              className="rounded-full "
              source={food}
              style={{ width: 200, height: 200 }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex items-center mt-8 ">
          <Text className="font-bold text-white tracking-widest text-center text-5xl">
            Foody
          </Text>
          <Text className="font-medium text-white tracking-widest text-lg">
            Food is always right
          </Text>
        </View>

        <View className={` mt-8  w-full  gap-3 items-center  `}>
          <TouchableOpacity
            className="bg-white  p-3  w-[60%]  rounded-lg   items-center"
            onPress={handleLoginPress}
          >
            <Text className="text-amber-500 font-bold  text-xl">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`border-2 border-white p-3 w-[60%]  rounded-lg items-center`}
            onPress={handleRegisterPress}
          >
            <Text className="text-white font-bold text-xl">Get Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
