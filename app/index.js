import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MainBar from "./main-page/MainBar";
import AppMain from "./main-page/AppMain";
import {Link} from 'expo-router'

export default function Page() {
  return (
    <View style={styles.container}>
      <MainBar />
      <AppMain />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    // color: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
