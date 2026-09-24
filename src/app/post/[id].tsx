/**
 * Blog Details Component Page
 */
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { BlogDetails } from "@/components/BlogDetails";

export default function BlogDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // BlogDetails owns the lookup and the "Post not found" state, so an
  // unknown id still renders a screen with a way back.
  return (
    <View className="flex-1 bg-ink">
      <BlogDetails id={id} />
    </View>
  );
}