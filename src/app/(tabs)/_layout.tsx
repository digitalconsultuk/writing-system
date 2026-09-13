
import "@/global.css";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", headerStyle: { backgroundColor: '#000' },
        tabBarIcon:({color,focused})=> <Ionicons name={focused ? 'book-sharp' : 'book-outline'} color={color} size={24} />
      }} />
      <Tabs.Screen name="LoginScreen" options={{ title: "Login-Page", headerStyle: { backgroundColor: '#000' },
        tabBarIcon:({color,focused})=> <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
       }} />
      <Tabs.Screen name="RegisterScreen" options={{ title: "Register-Page", headerStyle: { backgroundColor: '#000' },
        tabBarIcon:({color,focused})=> <Ionicons name={focused ? 'desktop-sharp' : 'desktop-outline'} color={"black"} size={24} testID="desktop" />
      }} />
    </Tabs>
  );
}
