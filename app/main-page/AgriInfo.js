import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Button } from "@react-native-material/core";
import MainBar from "./MainBar";

const AgriInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSecondVisible, setIsSecondVisible] = useState(false);
  const [isKharifCropVisible, setIsKharifCropVIsible] = useState(false);
  const [isRabiCropsAvailable, setIsRabiCropsAvailable] = useState(false);
  const [isZaidCropsAvailable, setIsZaidCropsAvailable] = useState(false);

  const textAnimation = useRef(new Animated.Value(0)).current;

  const handleButtonPress = (type) => {
    if (type === "first") {
      setIsVisible(false);
    } else if (type === "second") {
      setIsSecondVisible(false);
    } else if (type === "kharif") {
      setIsKharifCropVIsible(false);
    } else if (type === "rabi") {
      setIsRabiCropsAvailable(false);
    } else if (type === "zaid") {
      setIsZaidCropsAvailable(false);
    }

    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleHideButton = (type) => {
    if (type === "first") {
      setIsVisible(true);
    } else if (type === "second") {
      setIsSecondVisible(true);
    } else if (type === "kharif") {
      setIsKharifCropVIsible(true);
    } else if (type === "rabi") {
      setIsRabiCropsAvailable(true);
    } else if (type === "zaid") {
      setIsZaidCropsAvailable(true);
    }
  };

  //     <View >
  //

  // </View>
  return (
    <View style={Styles.agriInfoContainer}>
      <MainBar />

      <ScrollView style={Styles.agriContentContainer}>
        <View style={Styles.viewItemForScrollView}>
          <TouchableOpacity
            onPress={() =>
              isVisible ? handleButtonPress("first") : handleHideButton("first")
            }
            style={Styles.questionContainers}
          >
            <Text style={Styles.questionInAnswer}>What are Crops. ?</Text>
          </TouchableOpacity>
          {/* {isVisible && (
            <Animated.ScrollView
              style={[
                {
                  height: textAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                },
                Styles.scrollBarContainer,
              ]}
            >
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> 
              <Text style={Styles.AnswerContent}>
                Crops are plants grown by the farmers. Agriculture plays a very
                important role in the Indian economy. It is the backbone of our
                country. 70% of the Indian population depends on agriculture for
                food and money. It is the major occupation in the rural areas.
                The cultivation of crops depends primarily on the weather and
                soil conditions.
              </Text>
            </Animated.ScrollView>
          )}
        </View> */}

          {isVisible && (
            <View style={Styles.scrollBarContainer}>
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> */}
              <Text style={Styles.AnswerContent}>
                Crops are plants grown by the farmers. Agriculture plays a very
                important role in the Indian economy. It is the backbone of our
                country. 70% of the Indian population depends on agriculture for
                food and money. It is the major occupation in the rural areas.
                The cultivation of crops depends primarily on the weather and
                soil conditions.
              </Text>
            </View>
          )}
        </View>

        <View style={Styles.viewItemForScrollView}>
          <TouchableOpacity
            onPress={() =>
              isSecondVisible
                ? handleButtonPress("second")
                : handleHideButton("second")
            }
            style={Styles.questionContainers}
          >
            <Text style={Styles.questionInAnswer}>Types Of Crops.</Text>
          </TouchableOpacity>
          {isSecondVisible && (
            <View style={Styles.scrollBarContainer}>
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> */}
              <Text style={Styles.AnswerContent}>
                The crops are of the following types depending upon the season
                they are: Kharif crops, also known as monsoon crops or autumn
                crops, are domesticated plants that are cultivated and harvested
                in India, Pakistan and Bangladesh during the Indian
                subcontinent's monsoon season, which lasts from June to November
                depending on the area.[1] Monsoon rains may begin as early as
                May in some parts of the Indian subcontinent, and crops are
                generally harvested from the third week of September to October.
                Rice, maize, and cotton are some of the major Kharif crops in
                India. Unlike the Rabi crops, which are grown in the winter, the
                kharif crops require good rainfall.
              </Text>
            </View>
          )}
        </View>

        <View style={Styles.viewItemForScrollView}>
          <TouchableOpacity
            onPress={() =>
              isKharifCropVisible
                ? handleButtonPress("kharif")
                : handleHideButton("kharif")
            }
            style={Styles.questionContainers}
          >
            <Text style={Styles.questionInAnswer}>The Kharif Crops.</Text>
          </TouchableOpacity>
          {isKharifCropVisible && (
            <View style={Styles.scrollBarContainer}>
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> */}
              <Text style={Styles.AnswerContent}>
                The Kharif season varies by crop and region, starting at the
                earliest in May and ending at the latest in January. In India,
                the season is popularly considered to start in June and end in
                October.[4] Kharif crops are usually sown at the beginning of
                the first rains during the advent of the south-west monsoon
                season, and they are harvested at the end of monsoon season
                (October–November). Monsoon sowing dates vary, occurring toward
                the end of May in the southern state of Kerala and reaching July
                in some north Indian states. In other regions like Maharashtra,
                the west coast of India, and Pakistan, which receive rains in
                June, Kharif crops are sown in May, June and July.[5] In
                Bangladesh, Kharif crops are usually sown with the beginning of
                the first rains in June. These crops are dependent on the
                quantity of rainwater as well as its timing. Too much, too
                little, or rain at the wrong time may lay waste to the whole
                year's efforts. Kharif crops stand in contrast to the rabi
                crops, which are cultivated during the dry season. Rice is the
                most important Kharif crop of India. It is grown in rain-fed
                areas with hot and humid climates, especially the eastern and
                southern parts of India. Rice requires a temperature of 16–20 °C
                (61–68 °F) during the growing season and 18–32 °C (64–90 °F)
                during ripening. It needs rainfall from 150–200 centimetres
                (59–79 in) and needs a flooded field during the growth period.
              </Text>
            </View>
          )}
        </View>

        <View style={Styles.viewItemForScrollView}>
          <TouchableOpacity
            onPress={() =>
              isRabiCropsAvailable
                ? handleButtonPress("rabi")
                : handleHideButton("rabi")
            }
            style={Styles.questionContainers}
          >
            <Text style={Styles.questionInAnswer}>The Rabi Crops.</Text>
          </TouchableOpacity>
          {isRabiCropsAvailable && (
            <View style={Styles.scrollBarContainer}>
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> */}
              <Text style={Styles.AnswerContent}>
                Rabi crops are crops that are sown in the winter season and
                harvested in the summer season. In India, the Rabi season starts
                in October and ends in March. Some of the popular Rabi crops
                include wheat, barley, mustard, gram, and peas. These crops
                require less water than the kharif crops, so they are grown
                during the winter season when there is less rainfall. The Rabi
                crops are an essential source of food and income for farmers in
                India. The government also provides various subsidies and
                schemes to help farmers with the cultivation of these crops.
                Wheat is the most important Rabi crop in India, and it is grown
                extensively in the northern states of the country. Barley is
                another important Rabi crop, and it is grown in the drier
                regions of the country. Mustard is grown for its oil, which is
                used for cooking and making other food products. Gram and peas
                are grown for their seeds, which are used for making dal and
                other food products. The Rabi crops are an important source of
                food for the country, and they also contribute to the economy by
                providing employment to farmers and other people involved in the
                agriculture sector.
              </Text>
            </View>
          )}
        </View>

        <View style={Styles.viewItemForScrollView}>
          <TouchableOpacity
            onPress={() =>
              isZaidCropsAvailable
                ? handleButtonPress("zaid")
                : handleHideButton("zaid")
            }
            style={Styles.questionContainers}
          >
            <Text style={Styles.questionInAnswer}>Zaid Crops.</Text>
          </TouchableOpacity>
          {isZaidCropsAvailable && (
            <View style={Styles.scrollBarContainer}>
              {/* <TouchableOpacity
              onPress={handleHideButton}
              style={Styles.questionInAnswer}
            >
              <Text style={Styles.questionContent}>
                What is this questions ??
              </Text>
            </TouchableOpacity> */}
              <Text style={Styles.AnswerContent}>
                Zaid crops are crops that are sown in the summer season, between
                the Rabi and Kharif seasons. In India, the Zaid season starts in
                March and ends in June. Some of the popular Zaid crops include
                watermelon, muskmelon, cucumber, bitter gourd, pumpkin, and
                summer squash. These crops require less water than the Kharif
                crops and are grown during the summer season when there is less
                rainfall. The Zaid crops are an essential source of food and
                income for farmers in India. The government also provides
                various subsidies and schemes to help farmers with the
                cultivation of these crops. Watermelon is the most important
                Zaid crop in India, and it is grown extensively in the northern
                and western states of the country. Muskmelon is another
                important Zaid crop, and it is grown in the drier regions of the
                country. Cucumber is grown for its fruit, which is used for
                making salads and other food products. Bitter gourd is grown for
                its medicinal properties and is used for treating various
                ailments. Pumpkin and summer squash are grown for their fruit,
                which is used for making curries and other food products. The
                Zaid crops are an important source of food for the country, and
                they also contribute to the economy by providing employment to
                farmers and other people involved in the agriculture sector.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  agriInfoContainer: {
    height: "100%",
    backgroundColor: "rgb(29, 41, 63)",
  },
  agriContentContainer: {
    // alignItems: "center",
    color: "#fff",
    marginBottom: 20,
  },
  AnswerContent: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  questionContent: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  questionContainers: {
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgb(84, 104, 142)",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  questionInAnswer: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(35, 58, 100)",
    borderRadius: 10,
    padding: 15,
    color: "rgb(255, 239, 59)",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollBarContainer: {
    width: "80%",

    // height: 350,
    // alignItems: "center",
    backgroundColor: "rgb(84, 104, 142)",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  viewItemForScrollView: {
    alignItems: "center",
  },
});

export default AgriInfo;
