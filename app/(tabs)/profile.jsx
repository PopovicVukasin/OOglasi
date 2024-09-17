import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Brisanje naloga",
      "Da li ste sigurni da želite da obrišete svoj nalog? Ova akcija je nepovratna.",
      [
        {
          text: "Otkaži",
          style: "cancel",
        },
        {
          text: "Obriši",
          onPress: () => {
            // Implement account deletion logic here
            console.log("Account deletion confirmed");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-4">
        <View className="flex items-center m-6">
          <Image
            source={{ uri: user?.imageUrl }}
            className="h-32 w-32 rounded-full bg-gray-200 mb-4"
          />
          <View>
            <Text className="font-semibold text-lg">{user?.fullName}</Text>
          </View>
        </View>

        <View className="space-y-4">
          <InfoItem label="Ime" value={user?.firstName} />
          <InfoItem
            label="E-mail"
            value={user?.primaryEmailAddress?.emailAddress}
          />
          <InfoItem label="Broj telefona" value="+381" />
          <InfoItem label="Datum rođenja" value="04/04/2024" />
          <InfoItem label="Član od" value="04/04/2024" />
          <InfoItem
            label="Status naloga"
            value="Verifikovan"
            valueStyle="text-blue-500"
          />
        </View>

        <View className="mt-6 space-y-3">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-between py-3 px-4 border border-gray-300 rounded-md"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="log-out-outline"
                size={24}
                color="black"
                className="mr-3"
              />
              <Text className="text-base">Izlogujte se</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="flex-row items-center justify-between py-3 px-4 border border-gray-300 rounded-md"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="trash-outline"
                size={24}
                color="black"
                className="mr-3"
              />
              <Text className="text-base">Brisanje naloga</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const InfoItem = ({ label, value, valueStyle = "" }) => (
  <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
    <Text className="text-gray-500">{label}</Text>
    <Text className={`font-semibold ${valueStyle}`}>{value}</Text>
  </View>
);
