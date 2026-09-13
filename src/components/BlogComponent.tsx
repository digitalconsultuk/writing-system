import { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { type BlogPost, DUMMY_POSTS } from '@/data/BlogData';

type Props ={
  post:BlogPost,
  onPress:()=> void
}

function BlogCard({ post, onPress }: Props) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl mb-4 overflow-hidden border border-gray-200"
      onPress={onPress}
    >
      <Image source={{ uri: post.image }} className="w-full h-40" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-1">{post.title}</Text>
        <Text className="text-sm text-gray-500 mb-3" numberOfLines={2}>
          {post.excerpt}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xs text-gray-400">{post.author}</Text>
          <Text className="text-xs text-gray-400">{post.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function BlogComponent() {
  const [posts] = useState<BlogPost[]>(DUMMY_POSTS);

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <Text className="text-3xl font-bold text-black mb-4">Blog</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlogCard post={item} onPress={() => console.log('Open post', item.id)} />
        )}
      />
    </View>
  );
}