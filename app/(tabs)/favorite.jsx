import SearchBar from "@/components/SearchBar";
import React from "react";
import { Text, View } from "react-native";
import { FavoritesList } from "@/hooks/useFavorite";

const FavoriteScreen = () => {
  return (
    <View>
      <SearchBar />
      <FavoritesList />
    </View>
  );
};

export default FavoriteScreen;
