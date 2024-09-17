import { useOAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-1/2 h-1/4 mb-8"
        resizeMode="contain"
      />
      <View className="items-center w-full">
        {/* Button for Google Login */}
        <TouchableOpacity
          onPress={onPress}
          className="bg-blue-500 rounded-lg py-3 px-3 flex-row justify-center w-full mt-4 "
        >
          {/* <View className=""> */}
          <MaterialCommunityIcons
            name="google"
            size={20}
            color="#ffffff"
            className=""
          />
          <Text className="text-white font-semibold ml-5">
            ULOGUJTE SE PREKO GOOGLE
          </Text>
          {/* </View> */}
        </TouchableOpacity>
        {/* Button for Email Login */}
        <TouchableOpacity
          onPress={() => console.log("Email Login")}
          className="bg-blue-500  rounded-lg py-3 flex-row justify-center  w-full mt-4 space-x-6"
        >
          <MaterialCommunityIcons
            name="email"
            size={20}
            color="#ffffff"
            className="mr-2"
          />
          <Text className="text-white font-semibold ml-5">
            ULOGUJTE SE PREKO EMAIL
          </Text>
        </TouchableOpacity>
        {/* Button for Phone Login */}
        <TouchableOpacity
          onPress={() => console.log("Phone Login")}
          className="bg-blue-500  rounded-lg py-3 flex-row  justify-center w-full mt-4 space-x-6"
        >
          <MaterialCommunityIcons
            name="phone-check"
            size={20}
            color="#ffffff"
            className="mr-2"
          />
          <Text className="text-white font-semibold ml-5">
            ULOGUJTE SE PREKO TELEFONA
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    // borderColor: Color.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    // backgroundColor: Color.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  buttom: {
    padding: 15,
    // backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 40,
  },
});

export default LoginScreen;
