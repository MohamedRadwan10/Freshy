import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTokenContext } from "@/Context/UserTokenContext";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be longer than 20 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+/,
      "Must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
});

export default function Login() {
  const { setUserToken, setUserData } = useContext(UserTokenContext);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function loginSubmit(values) {
    setIsLoading(true);
    setErrors(null);
    try {
      Keyboard.dismiss();
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        await AsyncStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        setUserData(data.user);
        formik.resetForm();
        navigation.navigate("home");
      }
    } catch (err) {
      setErrors(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />

      <ScrollView
        className="w-full px-6"
        contentContainerStyle={{ flexGrow: 1,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
         }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="border border-1 border-amber-500 w-full  rounded-xl p-6">
          <View className="mb-8 w-full">
            <Text className="text-2xl font-bold text-gray-800">Login</Text>
            <Text className="text-amber-500 mt-1">
              Welcome back! Please enter your details
            </Text>
          </View>

          {errors && (
            <View className="mb-4 p-3 bg-red-100 rounded">
              <Text className="text-red-700">{errors}</Text>
            </View>
          )}

          <View className="mb-4 w-full">
            <Text className="text-gray-700 mb-1">Email:</Text>
            <TextInput
              className="border w-[100%] border-amber-500 rounded p-3"
              value={formik.values.email}
              onBlur={formik.handleBlur("email")}
              onChangeText={(text) => {
                formik.handleChange("email")(text);
                setErrors(null);
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Email input"
              accessibilityHint="Enter your email address"
              accessibilityRole="text"
            />
            {formik.errors.email && formik.touched.email && (
              <Text className="text-red-500 mt-1">{formik.errors.email}</Text>
            )}
          </View>

          <View className="mb-6 w-full">
            <Text className="text-gray-700 mb-1">Password:</Text>
            <TextInput
              className="border w-[100%] border-amber-500 rounded p-3"
              value={formik.values.password}
              onBlur={formik.handleBlur("password")}
              onChangeText={(text) => {
                formik.handleChange("password")(text);
                setErrors(null);
              }}
              placeholder="Enter your password"
              secureTextEntry
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password"
              accessibilityRole="text"
            />
            {formik.errors.password && formik.touched.password && (
              <Text className="text-red-500 mt-1">
                {formik.errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("forgot-password")}
            className="self-end mb-6"
            accessibilityRole="button"
          >
            <Text className="text-amber-500">Forgot Password?</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              className={`bg-amber-500 rounded p-3 flex-1 mr-2 ${
                !(formik.isValid && formik.dirty) || isLoading
                  ? "opacity-70"
                  : ""
              }`}
              onPress={formik.handleSubmit}
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              accessibilityRole="button"
              accessibilityLabel="Login button"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-medium">
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-amber-500 rounded p-3 flex-1"
              onPress={() => navigation.navigate("register")}
              accessibilityRole="button"
              accessibilityLabel="Register button"
              disabled={isLoading}
            >
              <Text className="text-amber-500 text-center">Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
