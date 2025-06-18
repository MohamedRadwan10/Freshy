import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

let phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;

let validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "name minLength is 3")
    .max(16, "name maxLength is 16")
    .required("name is required"),
  email: yup.string().email().required("email is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "phone is invalid")
    .required("phone is required"),
  password: yup
    .string()
    .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase")
    .required("password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "password and repassword don't match")
    .required("repassword is required"),
});

export default function Register() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function registerSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        setIsLoading(false);
        navigation.navigate("login");
      }
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response?.data?.message || "An error occurred");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />
      <ScrollView
        className="w-full px-6"
        contentContainerStyle={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="border border-1  w-full border-amber-500 rounded-xl p-5">
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-800">Register</Text>
            <Text className="text-amber-500 mt-1">
              Welcome! Please enter your details
            </Text>
          </View>

          {errors && (
            <View className="mb-4 p-3 bg-red-100 rounded">
              <Text className="text-red-700">{errors}</Text>
            </View>
          )}

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Name:</Text>
            <TextInput
              className="border border-amber-500 rounded p-3"
              value={formik.values.name}
              onBlur={formik.handleBlur("name")}
              onChangeText={formik.handleChange("name")}
              placeholder="Enter your name"
            />
            {formik.errors.name && formik.touched.name && (
              <Text className="text-red-500 mt-1">{formik.errors.name}</Text>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Phone:</Text>
            <TextInput
              className="border border-amber-500 rounded p-3"
              value={formik.values.phone}
              onBlur={formik.handleBlur("phone")}
              onChangeText={formik.handleChange("phone")}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            {formik.errors.phone && formik.touched.phone && (
              <Text className="text-red-500 mt-1">{formik.errors.phone}</Text>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Email:</Text>
            <TextInput
              className="border border-amber-500 rounded p-3"
              value={formik.values.email}
              onBlur={formik.handleBlur("email")}
              onChangeText={formik.handleChange("email")}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formik.errors.email && formik.touched.email && (
              <Text className="text-red-500 mt-1">{formik.errors.email}</Text>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Password:</Text>
            <TextInput
              className="border border-amber-500 rounded p-3"
              value={formik.values.password}
              onBlur={formik.handleBlur("password")}
              onChangeText={formik.handleChange("password")}
              placeholder="Enter your password"
              secureTextEntry
            />
            {formik.errors.password && formik.touched.password && (
              <Text className="text-red-500 mt-1">
                {formik.errors.password}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 mb-1">Confirm Password:</Text>
            <TextInput
              className="border border-amber-500 rounded p-3"
              value={formik.values.rePassword}
              onBlur={formik.handleBlur("rePassword")}
              onChangeText={formik.handleChange("rePassword")}
              placeholder="Confirm your password"
              secureTextEntry
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <Text className="text-red-500 mt-1">
                {formik.errors.rePassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className={`bg-amber-500 rounded p-3 items-center justify-center ${
              !(formik.isValid && formik.dirty) ? "opacity-70" : ""
            }`}
            onPress={formik.handleSubmit}
            disabled={!(formik.isValid && formik.dirty) || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-medium">Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
