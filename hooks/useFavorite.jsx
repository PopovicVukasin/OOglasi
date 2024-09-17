import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostItem from "@/components/PostItem";

// Custom hook to manage favorites
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const toggleFavorite = (item) => {
    const newFavorites = favorites.some((fav) => fav.id === item.id)
      ? favorites.filter((fav) => fav.id !== item.id)
      : [...favorites, item];
    saveFavorites(newFavorites);
  };

  const isFavorite = (item) => favorites.some((fav) => fav.id === item.id);

  return { favorites, toggleFavorite, isFavorite };
};
const FavoriteButton = ({ item, isFavorite, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialCommunityIcons
      name={isFavorite ? "heart" : "heart-outline"}
      size={24}
      color={isFavorite ? "red" : "black"}
    />
  </TouchableOpacity>
);

const FavoritePostItem = ({ item, toggleFavorite, isFavorite }) => {
  return (
    <PostItem
      item={item}
      favoriteButton={
        <FavoriteButton
          item={item}
          isFavorite={isFavorite(item)}
          onPress={() => toggleFavorite(item)}
        />
      }
    />
  );
};

const FavoritesList = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const keyExtractor = (item, index) => {
    if (item && item.id) {
      return item.id.toString();
    }
    // Fallback to using the index if id is not available
    return index.toString();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
        Favorites
      </Text>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={({ item }) =>
          item ? (
            <FavoritePostItem
              item={item}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ) : (
            console.log("Item not found")
          )
        }
      />
    </View>
  );
};

export { useFavorites, FavoriteButton, FavoritePostItem, FavoritesList };
