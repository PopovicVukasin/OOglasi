import {
  View,
  Button,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  getFirestore,
  getDocs,
  collection,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { app } from "@/firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

const CreateListing = () => {
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    setCategory([]);
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      // console.log("Docs:", doc.data());
      setCategory((category) => [...category, doc.data()]);
    });
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    value.image = image;
    setLoading(true);
    //Convert URI tp Blob File
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;
          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success !!", "Post Added Successfully.");
          }
        });
      });
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView className="p-10 bg-white">
        <Text className="text-[25px] font-bold">Dodaj novu objavu</Text>
        <Text className="text-[16px] text-gray-500 mb-7">
          Napravite novu objavu i započnite prodaju
        </Text>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            category: "",
            address: "",
            price: "",
            image: "",
            userName: "",
            userEmail: "",
            userImage: "",
            createdAt: Date.now(),
          }}
          onSubmit={onSubmitMethod}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              console.log("Title not present");
              ToastAndroid.show("Naziv je obavezan", ToastAndroid.SHORT);
              // errors.name = "Title Must be there";
            }
            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 75, height: 75, borderRadius: 15 }}
                  />
                ) : (
                  <Image
                    source={require("./../../assets/images/placeholder2.jpg")}
                    style={{ width: 75, height: 75, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Naslov"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Opis"
                value={values?.desc}
                numberOfLines={5}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                style={styles.input}
                placeholder="Cena"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Adresa"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
                <Picker
                  selectedValue={values?.category}
                  style={styles.input}
                  onValueChange={handleChange("category")}
                >
                  {category &&
                    category.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: loading ? "#ccc" : "#007BFF",
                }}
                disabled={loading}
                className="p-4 bg-blue-500 rounded-full mt-5"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center text-[16px]">
                    Objavi oglas
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: "top",
    fontSize: 17,
  },
});
export default CreateListing;
