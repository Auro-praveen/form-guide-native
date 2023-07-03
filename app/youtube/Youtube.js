import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import MainBar from "../main-page/MainBar";
import { Flex } from "@react-native-material/core";

const shippingUpToBotston = "x-64CaD8GXw";

const Youtube = () => {
  return (
    <View>
      <MainBar />
      <Text style={Styles.titleText}>Some Forming Videos</Text>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "crimson",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <ScrollView
        style={Styles.scrollView}
        automaticallyAdjustsScrollIndicatorInsets
      >
        {/* playing in list */}
        {/* <YoutubePlayer
          height={300}
          pl
          ay={false}9
          playList={"PLvIJiLY_6AE7QVkYqE7rcG2nXrcNn4I8g"}
          playListStartIndex={0}
        /> */}

        {/* playing single video by providing id */}
        <View style={Styles.allVideoContainer}>
          <View style={Styles.youtubeVideoContainer}>
            <YoutubePlayer height={250} play={false} videoId="y002Fkb9iaQ" />
            <Text style={Styles.subTitleText}>
              Sustainable agriculture practices in india
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: "crimson",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={Styles.youtubeVideoContainer}>
            <YoutubePlayer height={250} play={false} videoId="flB_7JOb8W4" />
            <Text style={Styles.subTitleText}>
              Agriculture online marketing strategy.
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: "crimson",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={Styles.youtubeVideoContainer}>
            <YoutubePlayer height={250} play={false} videoId="lRyXlvIJFWI" />
            <Text style={Styles.subTitleText}>Organic farming.</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: "crimson",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={Styles.youtubeVideoContainer}>
            <YoutubePlayer height={250} play={false} videoId="oRFyk7xc_8g" />
            <Text style={Styles.subTitleText}>
              Sustainable agriculture part 2.
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: "crimson",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={Styles.youtubeVideoContainer}>
            <YoutubePlayer height={300} play={false} videoId="hpI3CACoRaQ" />
            <Text style={Styles.subtitleLastText}>Types of Soils in India.</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: "crimson",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 20
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    color: "rgb(9, 105, 5)",
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitleText: {
    textAlign: "center",
    color: "rgb(9, 105, 5)",
    marginTop: -20,
    fontWeight: 400,
    // marginBottom: 0,
    fontSize: 20,
  },
  scrollView: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: "80%",

    // paddingBottom: 100,
  },

  allVideoContainer: {
    // width: "98%",
    // margin: 10
  },

  youtubeVideoContainer: {
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
    textAlign: "center",
  },

  subtitleLastText: {
    textAlign: "center",
    color: "rgb(9, 105, 5)",
    marginTop: -70,
    fontWeight: 400,
    // marginBottom: 0,
    fontSize: 20,
  }
});

export default Youtube;
