
import "@/global.css"
import { View } from "react-native"
import BlogComponent from "@/components/BlogComponent"

export default function Index(){
  return(
    <View className=" flex-1">
      <BlogComponent />
    </View>
  )
}