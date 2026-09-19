export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  url: string
};

export const DUMMY_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React Native",
    excerpt:
      "Learn the basics of building cross-platform mobile apps with React Native and Expo.",
    author: "Jane Doe",
    date: "Sep 10, 2026",
    image: "https://picsum.photos/seed/1/400/200",
    url: "https://dev.to/vrinch/getting-started-with-react-native-expo-a-beginners-guide-4ae8",
  },
  {
    id: "2",
    title: "Styling with NativeWind",
    excerpt:
      "How to bring Tailwind CSS utility classes into your React Native projects.",
    author: "John Smith",
    date: "Sep 8, 2026",
    image: "https://picsum.photos/seed/2/400/200",
    url: "https://blog.logrocket.com/getting-started-nativewind-tailwind-react-native/",
  },
  {
    id: "3",
    title: "Navigating with Expo Router",
    excerpt: "A deep dive into file-based routing for React Native apps.",
    author: "Alex Lee",
    date: "Sep 5, 2026",
    image: "https://picsum.photos/seed/3/400/200",
    url: "https://labs.thisdot.co/blog/file-based-routing-with-expo-router",
  },
  {
    id: "4",
    title: "Smooth Animations with React Native Reanimated",
    excerpt:
      "A tutorial on building fluid, gesture-driven animations using Reanimated.",
    author: "Angelina Romashko",
    date: "Sep 3, 2026",
    image: "https://picsum.photos/seed/4/400/200",
    url: "https://www.upsilonit.com/blog/react-native-animation-tutorial-creating-animations-with-reanimated",
  },
  {
    id: "5",
    title: "Global State Management with Zustand",
    excerpt:
      "How to implement lightweight, performant global state in React Native with Zustand.",
    author: "Nawaz Dhandala",
    date: "Aug 30, 2026",
    image: "https://picsum.photos/seed/5/400/200",
    url: "https://oneuptime.com/blog/post/2026-01-15-react-native-zustand-state/view",
  },
  {
    id: "6",
    title: "How to Set Up Expo Push Notifications",
    excerpt:
      "A practical guide to configuring, sending, and troubleshooting push notifications with Expo.",
    author: "Gaurav Verma",
    date: "Aug 27, 2026",
    image: "https://picsum.photos/seed/6/400/200",
    url: "https://www.suprsend.com/post/expo-push-notifications",
  },
  {
    id: "7",
    title: "Getting Started with TypeScript in React Native",
    excerpt:
      "Setup, benefits, and best practices for adding TypeScript to a React Native project.",
    author: "Ritika Gautam",
    date: "Aug 24, 2026",
    image: "https://picsum.photos/seed/7/400/200",
    url: "https://www.tothenew.com/blog/?p=71689",
  },
];
