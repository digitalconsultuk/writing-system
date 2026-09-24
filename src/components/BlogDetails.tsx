/**
 * Blog details component page
 */
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Pressable, ScrollView, Text, View } from "react-native";

import { DUMMY_POSTS } from "@/data/BlogData";
import { colors } from "@/theme";
import { getById } from "@/utils/getById";

type Props = {
  /** Id of the post to render, e.g. from `useLocalSearchParams()`. */
  id: string;
};

/** "https://blog.logrocket.com/a/b" -> "blog.logrocket.com" */
function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

export function BlogDetails({ id }: Props) {
  const router = useRouter();
  const post = getById(DUMMY_POSTS, id);

  // A stale link or a hand-typed id should land somewhere, not crash.
  if (!post) {
    return (
      <View className="flex-1 items-center justify-center bg-ink px-5">
        <View className="w-full items-center rounded-3xl border border-ink-600 bg-ink-800 px-6 py-12">
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color={colors.goldDim}
          />
          <Text className="mt-3 text-sm font-semibold uppercase tracking-[2px] text-gold-700">
            Post not found
          </Text>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            className="mt-6 rounded-2xl bg-gold px-6 py-3 active:opacity-80"
          >
            <Text className="text-xs font-black uppercase tracking-[3px] text-ink">
              Back to blog
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const host = hostOf(post.url);

  const openArticle = async () => {
    try {
      await WebBrowser.openBrowserAsync(post.url, {
        toolbarColor: colors.ink, // Android Custom Tab chrome
        controlsColor: colors.gold, // iOS SFSafariViewController tint
        enableBarCollapsing: true,
      });
    } catch {
      // No in-app browser available - not worth interrupting the reader over.
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-ink"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View>
        <Image
          source={{ uri: post.image }}
          style={{
            width: "100%",
            height: 240,
            backgroundColor: colors.inkSurface,
          }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          accessibilityLabel={post.title}
        />
        {/* Scrim - the stock photos are bright, the app is not. The lower
            band darkens the strip the body card overlaps. */}
        <View className="absolute inset-0 bg-ink/40" />
        <View className="absolute bottom-0 h-24 w-full bg-ink/80" />
      </View>

      {/* Body card, pulled up over the hero */}
      <View className="mx-5 -mt-10 rounded-3xl border border-ink-600 bg-ink-800 px-5 pb-7 pt-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-[10px] font-semibold uppercase tracking-[4px] text-gold-700">
            Article
          </Text>
          <Text className="text-[11px] uppercase tracking-[1px] text-gold-700">
            {post.date}
          </Text>
        </View>

        <Text className="mt-3 text-2xl font-black leading-8 text-gold-50">
          {post.title}
        </Text>

        {/* Byline - same initial-avatar motif as the list card */}
        <View className="mt-4 flex-row items-center">
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-full border border-gold-700 bg-ink-700">
            <Text className="text-xs font-black text-gold">
              {post.author.charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-xs font-semibold text-gold-50"
              numberOfLines={1}
            >
              {post.author}
            </Text>
            <Text className="text-[11px] text-gold-700" numberOfLines={1}>
              {host}
            </Text>
          </View>
        </View>

        {/* Hairline divider */}
        <View className="my-5 h-px bg-ink-600" />

        <Text className="text-base leading-7 text-gold-100">
          {post.excerpt}
        </Text>

        <Text className="mt-5 text-xs leading-5 text-gold-700">
          The full piece lives on {host}. Open it to keep reading.
        </Text>
      </View>

      {/* Actions */}
      <View className="mt-6 px-5">
        <Pressable
          onPress={openArticle}
          accessibilityRole="link"
          accessibilityLabel={`Read ${post.title} on ${host}`}
          className="flex-row items-center justify-center rounded-2xl bg-gold py-4 active:opacity-80"
        >
          <Ionicons name="open-outline" size={16} color={colors.ink} />
          <Text className="ml-2 text-sm font-black uppercase tracking-[3px] text-ink">
            Read full article
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          className="mt-3 items-center py-2 active:opacity-60"
        >
          <Text className="text-[11px] font-semibold uppercase tracking-[3px] text-gold-700">
            Back to blog
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
