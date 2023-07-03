import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { Divider } from "@react-native-material/core";
import formerBackgroundImage from "./../assets/form2.jpg";
import { Stack, Button } from "@react-native-material/core";
import Weather from "./../WeatherReport/Weather";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import about from './AboutUs'

const AppMain = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={Styles.safeArea}>
      <ImageBackground
        source={formerBackgroundImage}
        resizeMode="cover"
        style={Styles.backgroundImage}
      >
        <View style={Styles.mainPageHeaderItemContainer}>
          <Text style={Styles.textHeder}>All You Need To Know About</Text>
          <Text style={Styles.textContent}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
            reprehenderit soluta odio provident aspernatur! Tenetur impedit
            iusto veniam, ab inventore quos harum numquam maxime molestiae
            praesentium doloribus reprehenderit velit ea!
          </Text>
        </View>

        <Stack style={Styles.btnGroupStack} fill center spacing={4}>
          <Button
            style={Styles.mainPageBtn}
            color="#fff"
            variant="text"
            title="YouTube Videos"
            trailing={(props) => (
              <Icons
                style={StyleSheet.create({ fontSize: 30 })}
                name="youtube"
                {...props}
                color={"#fff"}
              />
            )}
            onPress={() => router.push("./../youtube/Youtube")}
          />
          <Button
            style={Styles.mainPageBtn}
            color="#fff"
            variant="text"
            title="crop info"
            trailing={(props) => (
              <Icons
                style={StyleSheet.create({ fontSize: 30 })}
                name="tractor"
                {...props}
                color={"#fff"}
              />
            )}
            onPress={() => router.push("./../main-page/AgriInfo")}
          />
          <Button
            style={Styles.mainPageBtn}
            color="#fff"
            variant="text"
            title="Contact"
            trailing={(props) => (
              <Icons
                style={StyleSheet.create({ fontSize: 30 })}
                name="contacts"
                {...props}
                color={"#fff"}
              />
            )}
          />

          <Button
            style={Styles.mainPageBtn}
            color="#fff"
            variant="text"
            title="Weather"
            onPress={() => {
              router.push("./../WeatherReport/Weather");
            }}
            trailing={(props) => (
              <Icons
                style={StyleSheet.create({ fontSize: 30 })}
                name="weather-cloudy"
                {...props}
                color={"#fff"}
              />
            )}
          />

          <Button
            style={Styles.mainPageBtn}
            color="#fff"
            variant="text"
            title="About us"
            trailing={(props) => (
              <Icons
                style={StyleSheet.create({ fontSize: 30 })}
                name="comment-account"
                {...props}
                color={"#fff"}
              />
            )}
            onPress={() => router.push("./../main-page/AboutUs")}
          />

          {/* <Link href={'./'}> 

          </Link> */}
        </Stack>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    color: "#fff",
  },
  backgroundImage: {
    marginTop: -70,
    flex: 1,
    justifyContent: "center",
  },
  textHeder: {
    marginTop: 70,
    color: "rgb(255, 239, 59)",
    fontSize: 25,
    lineHeight: 65,
    // color: '#000',
    fontWeight: "bold",
    fontStyle:"normal",

    textAlign: "center",
  },

  textContent: {
    color: "#fff",
    fontSize: 18,
    // color: '#000',
    fontWeight: 500,
    textAlign: "center",
  },

  btnGroupStack: {
    marginTop: "-30%",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    margin: "auto",
  },

  mainPageBtn: {
    width: 300,
    padding: 10,
    fontSize: 80,
    fontWeight: 700,
    margin: 10,
    borderColor: "crimson",
    borderWidth: 2,
    fontStyle: "normal",
    backgroundColor: "rgba(0, 0, 0, 0.315)",
  },

  mainPageHeaderItemContainer: {
    backgroundColor: "rgba(69, 69, 69, 0.414)",
    padding:15
    
  }
});

export default AppMain;
