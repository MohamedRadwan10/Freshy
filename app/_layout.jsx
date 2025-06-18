import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "@/global.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { UserTokenProvider } from "@/Context/UserTokenContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider store={store}>
        <UserTokenProvider>
          <Stack>
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen
              name="categoryDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="details" options={{ headerShown: false }} />
            <Stack.Screen name="ingredient" options={{ headerShown: false }} />
            <Stack.Screen
              name="ingredientDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="area" options={{ headerShown: false }} />
            <Stack.Screen name="areaDetails" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </UserTokenProvider>
      </Provider>
    </ThemeProvider>
  );
}