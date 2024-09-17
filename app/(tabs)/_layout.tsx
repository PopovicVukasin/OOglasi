import React from "react";
import { View } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreenStackNav from "../(navigation)/HomeScreenStackNav";
import MessagesScreen from "../(tabs)/messages";
import ProfileStackNav from "../(navigation)/ProfileStackNav";
import CreateListing from "../(tabs)/listing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FavoriteScreenNav from "../(navigation)/FavoriteScreenNav";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.light.tint,
          headerStyle: {},
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreenStackNav}
          options={{
            title: "Pocetna",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            title: "Poruke",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message-text"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreateListing"
          component={CreateListing}
          options={{
            title: "Novi oglas",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: Colors.light.secondary,
                  borderRadius: 25,
                  marginBottom: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <MaterialCommunityIcons name="plus" color="#fff" size={size} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="FavoriteScreenNav"
          component={FavoriteScreenNav}
          options={{
            title: "Moji oglasi",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackNav}
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
