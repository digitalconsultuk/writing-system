import { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
};

export const DUMMY_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    excerpt: 'Learn the basics of building cross-platform mobile apps with React Native and Expo.',
    author: 'Jane Doe',
    date: 'Sep 10, 2026',
    image: 'https://picsum.photos/seed/1/400/200',
  },
  {
    id: '2',
    title: 'Styling with NativeWind',
    excerpt: 'How to bring Tailwind CSS utility classes into your React Native projects.',
    author: 'John Smith',
    date: 'Sep 8, 2026',
    image: 'https://picsum.photos/seed/2/400/200',
  },
  {
    id: '3',
    title: 'Navigating with Expo Router',
    excerpt: 'A deep dive into file-based routing for React Native apps.',
    author: 'Alex Lee',
    date: 'Sep 5, 2026',
    image: 'https://picsum.photos/seed/3/400/200',
  },
];

