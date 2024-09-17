import { View, TextInput } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const SearchBar = () => {
  return (
    <View className="flex flex-row items-center  mt-4 rounded-lg border-[1px] border-gray-200 px-5 py-2">
      <MaterialIcons name="search" size={24} color="gray" />
      <TextInput
        placeholder="Pretraga"
        className="ml-1 text-[17px] flex-1"
        onChangeText={(value) => console.log(value)}
      />
    </View>
  );
};

export default SearchBar;
