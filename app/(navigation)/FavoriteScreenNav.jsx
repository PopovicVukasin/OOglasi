import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import FavoriteScreen from "../(tabs)/favorite";
import ProductFavoriteStackNav from "./ProductFavoriteStackNav"; // Adjust path as necessary
import { SafeAreaView } from "react-native";

const Tab = createMaterialTopTabNavigator();

const FavoriteScreenNav = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 40 }}>
      <Tab.Navigator>
        <Tab.Screen name="Moji oglasi" component={ProductFavoriteStackNav} />
        <Tab.Screen name="Omiljeno" component={FavoriteScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FavoriteScreenNav;
