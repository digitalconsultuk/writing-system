import "@/global.css";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { colors } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: colors.ink },
        headerTintColor: colors.gold,
        headerShadowVisible: false,

        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.goldDim,
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopColor: colors.inkBorder,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book-sharp" : "book-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="LoginScreen"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="RegisterScreen"
        options={{
          title: "Play",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "desktop-sharp" : "desktop-outline"}
              color={color}
              size={24}
              testID="desktop"
            />
          ),
        }}
      />
    </Tabs>
  );
}
