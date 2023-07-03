import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import MainBar from "./MainBar";
import { Button } from "@react-native-material/core";
import { useRouter } from "expo-router";

const AboutUs = () => {
  const router = useRouter();
  return (
    <View style={Styles.layoutContainer}>
      <MainBar />
      <ScrollView style={Styles.aboutUsContainer}>
        <Text style={Styles.aboutUsHeader}>About Us</Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
        <Text style={Styles.aboutUsContent}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          autem, nisi reiciendis eos, magnam odio nobis provident quia
          repellendus cupiditate ab repellat? Iusto temporibus perspiciatis a
          exercitationem culpa quidem magni.
        </Text>
      </ScrollView>

      {/* <View style={Styles.btnContainer}> */}
      <Button
        style={Styles.backBtn}
        onPress={() => router.back()}
        title="Back To menu"
        color="crimson"
      />
      {/* </View> */}
    </View>
  );
};

const Styles = StyleSheet.create({
  aboutUsContainer: {
    
    // alignItems: "center",
    // textAlign: "center",
    padding: 20,
    // paddingBottom: 100,
    marginBottom: 60,
    // height: '40%'
  },

  aboutUsHeader: {
    fontSize: 30,
    color: "rgb(255, 239, 59)",
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 5,
  },
  aboutUsContent: {
    textAlign: "center",
    fontSize: 16,

    color: "#fff",
  },
  layoutContainer: {
    height: "100%",
    backgroundColor: "rgb(29, 41, 63)",
    // position: "absolute",
  },

  //   btnContainer: {
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "flex-end",
  //   },
});

export default AboutUs;
