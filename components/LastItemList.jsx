import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <SafeAreaView className="mt-3 mb-5">
      <Text className="font-bold text-[18px]">{heading}</Text>
      <FlatList
        data={latestItemList}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </SafeAreaView>
  );
}
