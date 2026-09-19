import "@/global.css";
import LoginComponent from "@/components/LoginComponent";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-ink">
      <LoginComponent />
    </View>
  );
}
