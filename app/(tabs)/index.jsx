import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "@/components/Categories";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getSliders();
    await getCategoryList();
    await getLatestItemList();
    setRefreshing(false);
  };

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <SafeAreaView className="py-6 px-2 pt-10 bg-white flex-1">
      <Header />

      {/* Category List */}
      <Categories categoryList={categoryList} heading={"Kategorije"} />

      {/* Latest Item List with Refresh Control */}
      <FlatList
        style={{ marginTop: 10 }}
        data={latestItemList}
        renderItem={({ item }) => <PostItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
