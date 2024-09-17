import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import LatestItemList from "../../components/LastItemList";
import { useNavigation } from "@react-navigation/native";

export default function MyProducts() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [productList2, setProductList2] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      console.log(e);
    });
  }, [navigation]);

  {
    /* Used to get user post only */
  }
  const getUserPost = async () => {
    setProductList2([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList2((productList2) => [...productList2, doc.data()]);
    });
  };

  return (
    <View className="m-1">
      <LatestItemList latestItemList={productList2} />
    </View>
  );
}
