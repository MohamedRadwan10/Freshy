import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";
import { UserTokenContext } from "@/Context/UserTokenContext";
import Loading from "@/components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { setUserToken, setUserData: setContextUserData } =
    useContext(UserTokenContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("userData");
        if (userString) {
          const user = JSON.parse(userString);
          setUserData(user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Alert.alert("Error", "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "userData"]);
      setUserToken(null);
      setContextUserData(null);
      navigation.navigate("login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-6">
        <Text className="text-lg mb-4 text-gray-800">No user data found</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          className="bg-amber-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
console.log(userData);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />


      <Header title={"Profile"}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >

        <View className="items-center mb-8 mt-4">
          <View className="rounded-full w-32 h-32 items-center justify-center bg-amber-100 mb-4">
            <Text className="text-5xl text-amber-600 font-bold">
              {userData.name
                ? userData.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("")
                : "US"}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">
            {userData.name || "User"}
          </Text>
          <Text className="text-gray-500">{userData.email}</Text>
        </View>


        <View className="bg-gray-50 w-full rounded-xl p-6 mb-6">
          <Text className="text-lg font-semibold mb-4 text-gray-800">
            Account Information
          </Text>

          <View className="space-y-5">
            <View className="pb-3 border-b border-gray-200">
              <Text className="text-gray-500 text-sm">Full Name</Text>
              <Text className="text-gray-800 text-lg mt-1">
                {userData.name}
              </Text>
            </View>

            <View className="pb-3 border-b border-gray-200">
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-gray-800 text-lg mt-1">
                {userData.email}
              </Text>
            </View>
            <View className="pb-3 border-b border-gray-200">
              <Text className="text-gray-500 text-sm">Phone</Text>
              <Text className="text-gray-800 text-lg mt-1">
                {userData.phone}
              </Text>
            </View>
          </View>
        </View>


        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Logout",
              "Are you sure you want to logout?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: handleLogout, style: "destructive" },
              ],
              { cancelable: true }
            );
          }}
          className="bg-amber-500 py-4 w-full rounded-lg items-center mt-4"
        >
          <Text className="text-white font-bold text-lg">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
