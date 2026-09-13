
import "@/global.css";
import LoginComponent from "@/components/LoginComponent";
import { Text, View } from "react-native";
export default function LoginScreen() {
  return (
    <>
      <View className="flex-1 justify-center m-10 p-2">
        <LoginComponent/>
      </View>
    </>
  );
}