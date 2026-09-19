import "@/global.css";
import BlogComponent from "@/components/BlogComponent";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-ink">
      <BlogComponent />
    </View>
  );
}
