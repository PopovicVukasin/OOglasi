import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../(tabs)/index";
import ItemList from "../(product)/ItemList";
import ProductDetail from "../(product)/ProductDetail";
import Colors from "@/constants/Colors";

const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params?.category,
          headerStyle: {
            // backgroundColor: Colors.light.primary,
          },
          // headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerStyle: {
            // backgroundColor: Colors.light.primary,
          },
          // headerTintColor: "#fff",
          headerTitle: "Oglas",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNav;
