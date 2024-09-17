import SearchBar from "@/components/SearchBar";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MyProducts from "../(product)/MyProducts";
import ProductDetail from "../(product)/ProductDetail";

const Stack = createStackNavigator();

export default function ProductStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          paddingHorizontal: 10,
        },
        headerShown: true,
        header: () => <SearchBar />,
      }}
    >
      <Stack.Screen name="my-products" component={MyProducts} />
      <Stack.Screen name="product-detail" component={ProductDetail} />
    </Stack.Navigator>
  );
}
