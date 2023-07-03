import React from "react";
import { AppBar } from "@react-native-material/core";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Icon from '@expo/vector-icons/AntDesign'

function MainBar() {
  return (
      <AppBar
        style={Styles.appBarContainer}
        tintColor="#f2f2f2"
        titleStyle={{ fontSize: 28, marginTop: 26 }}
        title="Former Guide"
        centerTitle
        transparent
      />

  );
}

const Styles = StyleSheet.create({
  appBarContainer: {
    color: "white",
    textAlign: "center",
    // backgroundColor: "rgb(21, 54, 81)",
    
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    backgroundColor:"rgb(135, 44, 7)",
    height: 85,
  },

});

export default MainBar;
