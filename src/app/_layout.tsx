/**
 * Root layout for the navigation
 */
import "@/global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.ink },
          headerTintColor: colors.gold,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.ink },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
}
