import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Categories from "@/components/Categories";
import HomeMeals from "@/components/HomeMeals";
import Search from "@/components/Search";
import { useSelector } from "react-redux";
import ModelHeader from "@/components/ModelHeader";
import { UserTokenContext } from "@/Context/UserTokenContext";
import Loading from "@/components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { userData, setUserData } = useContext(UserTokenContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const { query } = useSelector((state) => state.search);

  const handleProfilePress = () => {
    navigation.navigate("profile");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("userData"); // Changed from "currentUser" to "userData"
        if (userString) {
          const user = JSON.parse(userString);
          setUserData(user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return (
      <View className="flex-1 bg-white justify-center  items-center">
        <View className="border border-amber-400 rounded-xl p-10">
          <Text className="text-xl mb-5">No user data found</Text>
          <Text className="text-xl mb-5">Please Login Here</Text>
          <Pressable
            className=" border border-amber-800 bg-amber-500 p-3 w-40  rounded-lg "
            onPress={() => navigation.navigate("login")}
          >
            <Text className="text-xl text-white text-center"> LOGIN</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1  bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
        className=" pt-0"
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className="rounded-full">
            <TouchableOpacity onPress={handleProfilePress}>
              <View className=" bg-amber-100  rounded-full flex-row items-center justify-center " style={{width:45,height:45}}>
                <Text className="text-lg text-amber-600  font-bold">
                  {userData.name
                    ? userData.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("")
                    : "US"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ModelHeader />
        </View>

        <View className="space-y-2 mb-5">
          <Text className="text-neutral-600">
            Hello, {userData.name || "User"}!
          </Text>
          <View>
            <Text className="font-semibold text-2xl text-neutral-600">
              Make your own food,
            </Text>
          </View>
          <Text className="font-semibold text-2xl text-neutral-600">
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>


        <Search />

        {!query && (
          <View>
            <Categories />
            <HomeMeals />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
