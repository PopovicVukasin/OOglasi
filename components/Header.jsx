import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import SearchBar from "./SearchBar";
import * as Location from "expo-location";
import { useState } from "react";

const Header = () => {
  const [locationName, setLocationName] = useState("Location");

  const handleLocationPress = async () => {
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to get your location."
        );
        return;
      }

      // Get the location
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      // Reverse geocode to get the location name
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Extract location info (e.g., city, region, street)
      if (reverseGeocode.length > 0) {
        let { city, region, street } = reverseGeocode[0];
        let name = street
          ? `${street}, ${city || region}`
          : `${city || region}`;
        setLocationName(name || "Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
      Alert.alert("Error", "Could not fetch location");
    }
  };

  return (
    <View className="">
      <View className="flex flex-row justify-between items-center">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-[120px] h-10"
          resizeMode="contain"
        />
        <TouchableOpacity
          className="flex flex-row items-center border-[1px] border-gray-400 px-3 py-[5px] rounded-full"
          onPress={handleLocationPress}
        >
          <MaterialCommunityIcons name="map-marker" size={24} color="gray" />
          <Text>{locationName}</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {/* Search Bar below the top section */}
      <SearchBar />
    </View>
  );
};

export default Header;
