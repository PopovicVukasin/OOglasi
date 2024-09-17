import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { app } from "../../firebaseConfig";

export default function ProductDetail({ navigation }) {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();

  useEffect(() => {
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Favorite Button */}
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={Colors.light.primary}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity onPress={() => shareProduct()}>
            <Ionicons
              name="share-social-sharp"
              size={24}
              color={Colors.light.primary}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  };

  {
    /* used to share Product */
  }

  const shareProduct = () => {
    const content = {
      message: product?.title + "\n" + product?.desc,
    };
    Share.share(content).then(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendEmailMessage = () => {
    const subject = "Regarding " + product.title;
    const body =
      "Hi " + product.userName + "\n" + "I am intrested in this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };
  const deleteUserPost = () => {
    Alert.alert("Do you want to Delete?", "Do you want to Delete this Post?", [
      {
        text: "Yes",
        onPress: () => deleteFromFireStore(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const deleteFromFireStore = async () => {
    console.log("Deleted");
    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product.title)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((resp) => {
        console.log("delleted the doc....");
        nav.goBack();
      });
    });
  };

  return (
    <ScrollView className="bg-white flex-1">
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      <View className="p-3">
        <Text
          className="text-[21px] font-bold"
          style={{ color: Colors.light.primary }}
        >
          {product?.id}
          {product?.title}
        </Text>

        <View className="items-center flex-row justify-between">
          <Text
            className="p-1 mt-2 px-2 rounded-full bg-blue-200"
            style={{ color: Colors.light.primary }}
          >
            {product?.category}
          </Text>
          <Text
            className="text-[30px] font-bold"
            style={{ color: Colors.light.primary }}
          >
            ${product?.price}
          </Text>
        </View>
        <Text className="mt-3 text-[17px] font-bold">Opis</Text>
        <Text className="text-[14px] text-gray-500">{product?.desc}</Text>
        <Text className="mt-3 text-[17px] font-bold">Adresa</Text>
        <Text className="text-[14px] text-gray-500">Adresa</Text>
      </View>
      {/* User Info */}
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 mt-1">
        <Image
          source={{ uri: product.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>
      <View className="w-full">
        {user?.primaryEmailAddress?.emailAddress == product?.userEmail ? (
          <TouchableOpacity
            onPress={() => deleteUserPost()}
            className="z-40 bg-red-500 p-4 m-2 rounded-lg"
          >
            <Text className="text-center text-white">Obrisi oglas</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row justify-center p-3">
            <TouchableOpacity
              onPress={() => sendEmailMessage()}
              className="z-40 bg-blue-500 p-4 m-2 rounded-lg space-x-4 flex-row w-1/2 justify-center"
            >
              <MaterialCommunityIcons
                name="message-text"
                size={20}
                color="white"
              />
              <Text className="text-center text-white">Poruka</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendEmailMessage()}
              className="z-40 bg-blue-500 p-4 m-2 rounded-lg flex-row space-x-4 w-1/2 justify-center"
            >
              <MaterialCommunityIcons name="phone" size={20} color="white" />
              <Text className="text-center text-white">Poziv</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
