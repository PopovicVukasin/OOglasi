import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useFavorites } from "@/hooks/useFavorite";

export default function PostItem({ item }) {
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <TouchableOpacity
      className="flex-row items-start p-2 bg-white rounded-lg shadow-sm mb-2 border-[1px] border-slate-200"
      onPress={() =>
        navigation.push("product-detail", {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-32 h-32 rounded-lg mr-3"
      />
      <View className="flex-1 space-y-2">
        <Text className="text-base font-semibold">{item.title}</Text>
        <Text className="text-base font-normal">Novo</Text>
        <Text
          className="bg-blue-200 mt-1 p-[2px] text-center rounded-full px-1 text-[10px] w-[70px]"
          style={{ color: Colors.light.primary }}
        >
          {item.category}
        </Text>
      </View>
      <View className="items-end space-y-5">
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <MaterialCommunityIcons
            name={isFavorite(item) ? "heart" : "heart-outline"}
            size={24}
          />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold mt-1"
          style={{ color: Colors.light.primary }}
        >
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
