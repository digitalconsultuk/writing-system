import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { type BlogPost, DUMMY_POSTS } from "@/data/BlogData";
import { colors } from "@/theme";

type Props = {
  post: BlogPost;
  index: number;
  onPress: () => void;
};

function BlogCard({ post, index, onPress }: Props) {
  return (
    <Pressable
      className="overflow-hidden rounded-3xl border border-ink-600 bg-ink-800 active:opacity-80"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Read ${post.title}`}
    >
      <View>
        <Image
          source={{ uri: post.image }}
          style={{
            width: "100%",
            height: 160,
            backgroundColor: colors.inkSurface,
          }}
          contentFit="cover"
          transition={200}
        />
        {/* Scrim keeps the image from glaring against the ink surface */}
        <View className="absolute inset-0 bg-ink/30" />

        {/* Issue number */}
        <View className="absolute left-4 top-4 rounded-lg border border-gold-700 bg-ink/80 px-2 py-1">
          <Text className="text-[10px] font-black tracking-[2px] text-gold">
            {String(index + 1).padStart(2, "0")}
          </Text>
        </View>
      </View>

      <View className="p-5">
        <Text className="mb-2 text-lg font-bold leading-6 text-gold-50">
          {post.title}
        </Text>
        <Text
          className="mb-4 text-sm leading-5 text-gold-700"
          numberOfLines={2}
        >
          {post.excerpt}
        </Text>

        {/* Hairline divider */}
        <View className="mb-3 h-px bg-ink-600" />

        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <View className="mr-2 h-6 w-6 items-center justify-center rounded-full border border-gold-700 bg-ink-700">
              <Text className="text-[10px] font-black text-gold">
                {post.author.charAt(0)}
              </Text>
            </View>
            <Text
              className="text-xs font-semibold text-gold-700"
              numberOfLines={1}
            >
              {post.author}
            </Text>
          </View>
          <Text className="ml-3 text-[11px] uppercase tracking-[1px] text-gold-700">
            {post.date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function BlogComponent() {
  const [posts] = useState<BlogPost[]>(DUMMY_POSTS);
  const router = useRouter()

  return (
    <View className="flex-1 bg-ink">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListHeaderComponent={
          <View className="pb-6 pt-14">
            <Text className="text-[11px] font-semibold uppercase tracking-[6px] text-gold-700">
              Latest
            </Text>
            <View className="mt-1 flex-row items-end justify-between">
              <Text className="text-3xl font-black uppercase tracking-[4px] text-gold">
                Blog
              </Text>
              <Text className="pb-1 text-xs font-semibold uppercase tracking-[2px] text-gold-700">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center rounded-3xl border border-ink-600 bg-ink-800 px-6 py-12">
            <Ionicons name="book-outline" size={32} color={colors.goldDim} />
            <Text className="mt-3 text-sm font-semibold uppercase tracking-[2px] text-gold-700">
              Nothing published yet
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <BlogCard
            post={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: "/post/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </View>
  );
}