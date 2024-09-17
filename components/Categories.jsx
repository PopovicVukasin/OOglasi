import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("item-list", { category: item?.name })}
      className="mr-4 items-center"
    >
      <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center shadow-sm">
        <Image source={{ uri: item.icon }} className="w-8 h-8" />
      </View>
      <Text className="text-xs mt-2 text-center">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-2 mb-4">
      <Text className="font-bold text-lg mb-4 px-4">Kategorije</Text>
      <FlatList
        data={categoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
