import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import RainImg from "../assets/rainy.jpg";
import SunnyImg from "../assets/warm.jpg";
import CloudyImg from "../assets/cloudy.jpg";
import ColdImg from "../assets/cold.jpg";
import ThunderImg from "../assets/thunder.jpg";
import MainBar from "../main-page/MainBar";
import NormalImg from "../assets/normal.png";
import NightImg from "../assets/night.png";

// icons to represent weather

import sunnyIcon from "../assets/icons/sunnyIcon.png";
import rainyIcon from "../assets/icons/rainIcon.png";
import thunderIcon from "../assets/icons/thunderIcon.png";
import cloudyIcon from "../assets/icons/cloudyIcon.png";
import nightIcon from "../assets/icons/nightIcon.png";
import { color } from "react-native-reanimated";
import { Button } from "@react-native-material/core";

const apiUrl =
  "api.openweathermap.org/data/2.5/forecast?lat=12.9565984&lon=77.5984188&appid=";
const apiKey = "0c41123e1b513161f6cf0f63f58749de";

const tempInKelvin = 273.15;

const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: "",
    long: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [weatherReport, setWeatherReport] = useState({
    country: "",
    city: "",
    temp: "",
    wType: "",
    wDescription: "",
  });

  const [PermissionGranted, setPermissionGranted] = useState(false);

  const [isNetworkOn, setIsNetworkOn] = useState(false);

  // console.log("temperture in degree celcius" +Math.round(Number(test.list[0].main.temp) - Number(tempInKelvin)));
  // console.log("weather type : "+test.list[0].weather[0].main)
  // console.log("weather type : "+test.list[0].weather[0].description)
  // console.log("name of the city : "+test.city.name);
  // console.log("contry name : "+test.city.country);

  useEffect(() => {
    console.log("called");
    getCurrentLocation();
  }, []);

  const getWeatherReport = (lat, lon) => {
    console.log("getting weather report" + lat, lon);
    const weatherApi =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    // console.log("api "+weatherApi);
    // const api = "api.openweathermap.org/data/2.5/forecast?lat=12.9565984&lon=77.5984188&appid=0c41123e1b513161f6cf0f63f58749de";
    fetch(weatherApi, {
      method: "GET",
      // headers: "application/json"
    })
      .then((resp) => resp.json())
      .then((data) => {
        setWeatherReport({
          ...weatherReport,
          city: data.city.name,
          country: data.city.country,
          temp: Math.round(
            Number(data.list[0].main.temp) - Number(tempInKelvin)
          ),
          wDescription: data.list[0].weather[0].description,
          wType: data.list[0].weather[0].main,
          // wType: "nodfgsfghs"
        });
        setIsLoading(false);
        setIsNetworkOn(true);
      })
      .catch((err) => {
        setIsNetworkOn(false);
        setIsLoading(false);
        console.log("err :", err);
      });
  };

  const getCurrentLocation = () => {
    // Location.

    setIsLoading(true);

    console.log("called again in sync");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("permission is not set");
        console.log(status);
        setIsLoading(false);
        setPermissionGranted(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      // console.log(location);
      setPermissionGranted(true);
      setCurrentLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });

      getWeatherReport(location.coords.latitude, location.coords.longitude);

      // return true;
    })();
  };

  return (
    <View style={Styles.weatherPageContainer}>
      <MainBar />

      {isLoading ? (
        <ActivityIndicator
          style={Styles.loading}
          size={50}
          color={"blue"}
          animating={true}
        />
      ) : !PermissionGranted ? (
        <View style={Styles.permissionStyle}>
          <View style={Styles.permissions}>
            <Text style={Styles.permissionText}>
              Please Give Permission To Access Your Current Location To View
              Weather Report{" "}
            </Text>
            <Button
              style={Styles.weatherReportBtn}
              title="Try again"
              onPress={() => getCurrentLocation()}
            />
          </View>
        </View>
      ) : !isNetworkOn ? (
        <View style={Styles.permissionStyle}>
          <View style={Styles.permissions}>
            <Text style={Styles.permissionText}>
              {" "}
              Please Check Your Internet Connection, And Try Again
            </Text>
            <Button
              style={Styles.weatherReportBtn}
              title="Try again"
              onPress={() => getCurrentLocation()}
            />
          </View>
        </View>
      ) : (
        <ImageBackground
          source={
            weatherReport.wType.toLowerCase() === "rain"
              ? RainImg
              : weatherReport.wType.toLowerCase() === "cloud"
              ? CloudyImg
              : weatherReport.wType.toLowerCase() === "sunny"
              ? SunnyImg
              : weatherReport.wType.toLowerCase() === "night"
              ? NightImg
              : weatherReport.wType.toLowerCase() === "cold"
              ? ColdImg
              : weatherReport.wType.toLowerCase() === "thunder"
              ? ThunderImg
              : NormalImg
          }
          resizeMode="cover"
          style={Styles.backgroundImage}
        >
          <View style={[Styles.temperatureContainer, Styles.shadowProp]}>
            <Image
              style={Styles.tempIcons}
              source={
                weatherReport.wType.toLowerCase() === "rain"
                  ? rainyIcon
                  : weatherReport.wType.toLowerCase() === "cloud"
                  ? cloudyIcon
                  : weatherReport.wType.toLowerCase() === "sunny"
                  ? sunnyIcon
                  : weatherReport.wType.toLowerCase() === "night"
                  ? nightIcon
                  : weatherReport.wType.toLowerCase() === "thunder"
                  ? thunderIcon
                  : sunnyIcon
              }
            ></Image>
            <Text style={[Styles.tempContainerText, Styles.mainTemp]}>
              {weatherReport.temp}°C
            </Text>
            <Text style={[Styles.tempContainerText, Styles.textType2]}>
              {weatherReport.wType}
            </Text>

            <Text style={Styles.tempContainerText}>
              {weatherReport.wDescription}
            </Text>
          </View>
          <View style={Styles.cityContainer}>
            <Text style={Styles.tempContainerText}>
              {weatherReport.country}
            </Text>
            <Text style={Styles.tempContainerText}>{weatherReport.city}</Text>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  weatherPageContainer: {
    marginTop: 0,
  },
  backgroundImage: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: -80,
  },
  temperatureContainer: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.523)",
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
    marginTop: -200,
    marginBottom: 30,
    width: 250,
    padding: 20,
    borderColor: "#fff",
    borderWidth: 2,
  },

  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cityContainer: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.523)",
    textAlign: "center",
    padding: 30,

    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
  },

  tempContainerText: {
    color: "#000",
    textAlign: "center",
  },
  tempIcons: {
    width: 50,
    height: 50,
  },

  mainTemp: {
    fontSize: 30,
    fontWeight: "bold",
    color: "crimson",
  },

  textType2: {
    fontSize: 20,
    fontWeight: 400,
  },

  permissionStyle: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    marginTop: -30,
    backgroundColor: "rgb(184, 202, 206)",
    color: "#fff",
  },
  permissions: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 200,
    backgroundColor: "#fff",
    borderColor: "rgb(220, 90, 47)",
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    color: "#fff",
  },
  permissionText: {
    fontSize: 25,
    color: "rgb(7, 39, 93)",
    fontWeight: 500,
    textAlign: "center",
  },
  weatherReportBtn: {
    width: "100%",
    marginTop: 25,
    backgroundColor: "#000",
  },

  loading: {
    height: "80%",
  },
});

export default Weather;

// for my testing purpose

const test = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1688288400,
      main: {
        temp: 301.24,
        feels_like: 302.51,
        temp_min: 301.24,
        temp_max: 302.72,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 911,
        humidity: 58,
        temp_kf: -1.48,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 83 },
      wind: { speed: 6.89, deg: 281, gust: 9.09 },
      visibility: 10000,
      pop: 0.2,
      rain: { "3h": 0.1 },
      sys: { pod: "d" },
      dt_txt: "2023-07-02 09:00:00",
    },
    {
      dt: 1688299200,
      main: {
        temp: 300.45,
        feels_like: 301.46,
        temp_min: 300.42,
        temp_max: 300.45,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 911,
        humidity: 58,
        temp_kf: 0.03,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 92 },
      wind: { speed: 6.58, deg: 271, gust: 10.01 },
      visibility: 10000,
      pop: 0.26,
      rain: { "3h": 0.22 },
      sys: { pod: "d" },
      dt_txt: "2023-07-02 12:00:00",
    },
    {
      dt: 1688310000,
      main: {
        temp: 297.09,
        feels_like: 297.39,
        temp_min: 297.09,
        temp_max: 297.09,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 913,
        humidity: 71,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 95 },
      wind: { speed: 6.25, deg: 273, gust: 10.42 },
      visibility: 10000,
      pop: 0.48,
      rain: { "3h": 0.49 },
      sys: { pod: "n" },
      dt_txt: "2023-07-02 15:00:00",
    },
    {
      dt: 1688320800,
      main: {
        temp: 295.67,
        feels_like: 296.01,
        temp_min: 295.67,
        temp_max: 295.67,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 912,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 94 },
      wind: { speed: 6.28, deg: 273, gust: 12.16 },
      visibility: 10000,
      pop: 0.52,
      rain: { "3h": 0.54 },
      sys: { pod: "n" },
      dt_txt: "2023-07-02 18:00:00",
    },
    {
      dt: 1688331600,
      main: {
        temp: 294.6,
        feels_like: 294.94,
        temp_min: 294.6,
        temp_max: 294.6,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 82,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 99 },
      wind: { speed: 6.51, deg: 269, gust: 13.24 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-02 21:00:00",
    },
    {
      dt: 1688342400,
      main: {
        temp: 294.04,
        feels_like: 294.38,
        temp_min: 294.04,
        temp_max: 294.04,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 84,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 6.64, deg: 265, gust: 13.61 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-03 00:00:00",
    },
    {
      dt: 1688353200,
      main: {
        temp: 295.75,
        feels_like: 296.02,
        temp_min: 295.75,
        temp_max: 295.75,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 912,
        humidity: 75,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.12, deg: 274, gust: 12.47 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-07-03 03:00:00",
    },
    {
      dt: 1688364000,
      main: {
        temp: 298.36,
        feels_like: 298.61,
        temp_min: 298.36,
        temp_max: 298.36,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 911,
        humidity: 64,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.63, deg: 283, gust: 11.17 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-07-03 06:00:00",
    },
    {
      dt: 1688374800,
      main: {
        temp: 299.85,
        feels_like: 300.74,
        temp_min: 299.85,
        temp_max: 299.85,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 910,
        humidity: 58,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.23, deg: 291, gust: 10.1 },
      visibility: 10000,
      pop: 0.5,
      rain: { "3h": 0.46 },
      sys: { pod: "d" },
      dt_txt: "2023-07-03 09:00:00",
    },
    {
      dt: 1688385600,
      main: {
        temp: 298.76,
        feels_like: 299.05,
        temp_min: 298.76,
        temp_max: 298.76,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 909,
        humidity: 64,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 6.54, deg: 278, gust: 10.13 },
      visibility: 10000,
      pop: 0.58,
      rain: { "3h": 0.53 },
      sys: { pod: "d" },
      dt_txt: "2023-07-03 12:00:00",
    },
    {
      dt: 1688396400,
      main: {
        temp: 295.94,
        feels_like: 296.31,
        temp_min: 295.94,
        temp_max: 295.94,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 911,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.92, deg: 264, gust: 12.43 },
      visibility: 10000,
      pop: 0.51,
      rain: { "3h": 1.15 },
      sys: { pod: "n" },
      dt_txt: "2023-07-03 15:00:00",
    },
    {
      dt: 1688407200,
      main: {
        temp: 294.85,
        feels_like: 295.22,
        temp_min: 294.85,
        temp_max: 294.85,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 911,
        humidity: 82,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.72, deg: 263, gust: 13.41 },
      visibility: 10000,
      pop: 0.28,
      sys: { pod: "n" },
      dt_txt: "2023-07-03 18:00:00",
    },
    {
      dt: 1688418000,
      main: {
        temp: 294.32,
        feels_like: 294.71,
        temp_min: 294.32,
        temp_max: 294.32,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 909,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.35, deg: 261, gust: 14.11 },
      visibility: 10000,
      pop: 0.22,
      rain: { "3h": 0.1 },
      sys: { pod: "n" },
      dt_txt: "2023-07-03 21:00:00",
    },
    {
      dt: 1688428800,
      main: {
        temp: 294.05,
        feels_like: 294.42,
        temp_min: 294.05,
        temp_max: 294.05,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 909,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.53, deg: 263, gust: 13.52 },
      visibility: 10000,
      pop: 0.2,
      rain: { "3h": 0.24 },
      sys: { pod: "n" },
      dt_txt: "2023-07-04 00:00:00",
    },
    {
      dt: 1688439600,
      main: {
        temp: 293.9,
        feels_like: 294.33,
        temp_min: 293.9,
        temp_max: 293.9,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 88,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.02, deg: 261, gust: 13.21 },
      visibility: 10000,
      pop: 0.83,
      rain: { "3h": 0.49 },
      sys: { pod: "d" },
      dt_txt: "2023-07-04 03:00:00",
    },
    {
      dt: 1688450400,
      main: {
        temp: 294.84,
        feels_like: 295.28,
        temp_min: 294.84,
        temp_max: 294.84,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.69, deg: 264, gust: 12.83 },
      visibility: 10000,
      pop: 0.94,
      rain: { "3h": 0.31 },
      sys: { pod: "d" },
      dt_txt: "2023-07-04 06:00:00",
    },
    {
      dt: 1688461200,
      main: {
        temp: 295.08,
        feels_like: 295.5,
        temp_min: 295.08,
        temp_max: 295.08,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 908,
        humidity: 83,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.29, deg: 263, gust: 13.13 },
      visibility: 10000,
      pop: 0.64,
      rain: { "3h": 0.24 },
      sys: { pod: "d" },
      dt_txt: "2023-07-04 09:00:00",
    },
    {
      dt: 1688472000,
      main: {
        temp: 294.28,
        feels_like: 294.72,
        temp_min: 294.28,
        temp_max: 294.28,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 908,
        humidity: 87,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.61, deg: 259, gust: 13.52 },
      visibility: 10000,
      pop: 0.7,
      rain: { "3h": 0.35 },
      sys: { pod: "d" },
      dt_txt: "2023-07-04 12:00:00",
    },
    {
      dt: 1688482800,
      main: {
        temp: 293.65,
        feels_like: 294.13,
        temp_min: 293.65,
        temp_max: 293.65,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 909,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 6.98, deg: 250, gust: 13.05 },
      visibility: 10000,
      pop: 0.82,
      rain: { "3h": 0.75 },
      sys: { pod: "n" },
      dt_txt: "2023-07-04 15:00:00",
    },
    {
      dt: 1688493600,
      main: {
        temp: 293.54,
        feels_like: 293.98,
        temp_min: 293.54,
        temp_max: 293.54,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 909,
        humidity: 90,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.01, deg: 255, gust: 14.16 },
      visibility: 10000,
      pop: 0.74,
      rain: { "3h": 0.27 },
      sys: { pod: "n" },
      dt_txt: "2023-07-04 18:00:00",
    },
    {
      dt: 1688504400,
      main: {
        temp: 293.23,
        feels_like: 293.64,
        temp_min: 293.23,
        temp_max: 293.23,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 907,
        humidity: 90,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.58, deg: 258, gust: 14.22 },
      visibility: 10000,
      pop: 0.75,
      rain: { "3h": 1.11 },
      sys: { pod: "n" },
      dt_txt: "2023-07-04 21:00:00",
    },
    {
      dt: 1688515200,
      main: {
        temp: 293.28,
        feels_like: 293.72,
        temp_min: 293.28,
        temp_max: 293.28,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 907,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" },
      ],
      clouds: { all: 100 },
      wind: { speed: 6.88, deg: 266, gust: 13.01 },
      visibility: 10000,
      pop: 0.75,
      rain: { "3h": 1.39 },
      sys: { pod: "n" },
      dt_txt: "2023-07-05 00:00:00",
    },
    {
      dt: 1688526000,
      main: {
        temp: 293.07,
        feels_like: 293.44,
        temp_min: 293.07,
        temp_max: 293.07,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 909,
        humidity: 89,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.23, deg: 270, gust: 14.48 },
      visibility: 10000,
      pop: 0.68,
      rain: { "3h": 1.13 },
      sys: { pod: "d" },
      dt_txt: "2023-07-05 03:00:00",
    },
    {
      dt: 1688536800,
      main: {
        temp: 296.33,
        feels_like: 296.58,
        temp_min: 296.33,
        temp_max: 296.33,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 909,
        humidity: 72,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.63, deg: 268, gust: 13.76 },
      visibility: 10000,
      pop: 0.59,
      rain: { "3h": 0.15 },
      sys: { pod: "d" },
      dt_txt: "2023-07-05 06:00:00",
    },
    {
      dt: 1688547600,
      main: {
        temp: 297.98,
        feels_like: 298.19,
        temp_min: 297.98,
        temp_max: 297.98,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 908,
        humidity: 64,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 10.35, deg: 270, gust: 14.22 },
      visibility: 10000,
      pop: 0.37,
      rain: { "3h": 0.41 },
      sys: { pod: "d" },
      dt_txt: "2023-07-05 09:00:00",
    },
    {
      dt: 1688558400,
      main: {
        temp: 295.92,
        feels_like: 296.18,
        temp_min: 295.92,
        temp_max: 295.92,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 908,
        humidity: 74,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.59, deg: 268, gust: 13.88 },
      visibility: 10000,
      pop: 0.45,
      rain: { "3h": 0.23 },
      sys: { pod: "d" },
      dt_txt: "2023-07-05 12:00:00",
    },
    {
      dt: 1688569200,
      main: {
        temp: 294.21,
        feels_like: 294.49,
        temp_min: 294.21,
        temp_max: 294.21,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 909,
        humidity: 81,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 99 },
      wind: { speed: 8.58, deg: 261, gust: 15.21 },
      visibility: 10000,
      pop: 0.26,
      sys: { pod: "n" },
      dt_txt: "2023-07-05 15:00:00",
    },
    {
      dt: 1688580000,
      main: {
        temp: 293.79,
        feels_like: 294.08,
        temp_min: 293.79,
        temp_max: 293.79,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 83,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.82, deg: 255, gust: 14.36 },
      visibility: 10000,
      pop: 0.18,
      sys: { pod: "n" },
      dt_txt: "2023-07-05 18:00:00",
    },
    {
      dt: 1688590800,
      main: {
        temp: 293.27,
        feels_like: 293.56,
        temp_min: 293.27,
        temp_max: 293.27,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 908,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.99, deg: 261, gust: 15.28 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-05 21:00:00",
    },
    {
      dt: 1688601600,
      main: {
        temp: 293.1,
        feels_like: 293.4,
        temp_min: 293.1,
        temp_max: 293.1,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 908,
        humidity: 86,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.4, deg: 257, gust: 14.69 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-06 00:00:00",
    },
    {
      dt: 1688612400,
      main: {
        temp: 294.56,
        feels_like: 294.79,
        temp_min: 294.56,
        temp_max: 294.56,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 910,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.19, deg: 259, gust: 14.92 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-07-06 03:00:00",
    },
    {
      dt: 1688623200,
      main: {
        temp: 298.21,
        feels_like: 298.39,
        temp_min: 298.21,
        temp_max: 298.21,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 911,
        humidity: 62,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 9.49, deg: 265, gust: 13.62 },
      visibility: 10000,
      pop: 0.2,
      rain: { "3h": 0.17 },
      sys: { pod: "d" },
      dt_txt: "2023-07-06 06:00:00",
    },
    {
      dt: 1688634000,
      main: {
        temp: 299.62,
        feels_like: 299.62,
        temp_min: 299.62,
        temp_max: 299.62,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 909,
        humidity: 56,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 10.03, deg: 268, gust: 13.26 },
      visibility: 10000,
      pop: 0.35,
      rain: { "3h": 0.17 },
      sys: { pod: "d" },
      dt_txt: "2023-07-06 09:00:00",
    },
    {
      dt: 1688644800,
      main: {
        temp: 298.45,
        feels_like: 298.63,
        temp_min: 298.45,
        temp_max: 298.45,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 910,
        humidity: 61,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
      ],
      clouds: { all: 100 },
      wind: { speed: 8.88, deg: 267, gust: 12.89 },
      visibility: 10000,
      pop: 0.26,
      rain: { "3h": 0.11 },
      sys: { pod: "d" },
      dt_txt: "2023-07-06 12:00:00",
    },
    {
      dt: 1688655600,
      main: {
        temp: 295.57,
        feels_like: 295.8,
        temp_min: 295.57,
        temp_max: 295.57,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 912,
        humidity: 74,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.1, deg: 261, gust: 12.56 },
      visibility: 10000,
      pop: 0.03,
      sys: { pod: "n" },
      dt_txt: "2023-07-06 15:00:00",
    },
    {
      dt: 1688666400,
      main: {
        temp: 294.04,
        feels_like: 294.3,
        temp_min: 294.04,
        temp_max: 294.04,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 912,
        humidity: 81,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 99 },
      wind: { speed: 7.26, deg: 256, gust: 13.76 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-06 18:00:00",
    },
    {
      dt: 1688677200,
      main: {
        temp: 293.62,
        feels_like: 293.81,
        temp_min: 293.62,
        temp_max: 293.62,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 911,
        humidity: 80,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 99 },
      wind: { speed: 7.63, deg: 259, gust: 14.56 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-06 21:00:00",
    },
    {
      dt: 1688688000,
      main: {
        temp: 293.37,
        feels_like: 293.56,
        temp_min: 293.37,
        temp_max: 293.37,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 911,
        humidity: 81,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.19, deg: 258, gust: 14.52 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-07-07 00:00:00",
    },
    {
      dt: 1688698800,
      main: {
        temp: 294.91,
        feels_like: 295.05,
        temp_min: 294.91,
        temp_max: 294.91,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 912,
        humidity: 73,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: { all: 99 },
      wind: { speed: 8.28, deg: 265, gust: 14.13 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-07-07 03:00:00",
    },
    {
      dt: 1688709600,
      main: {
        temp: 299.51,
        feels_like: 299.51,
        temp_min: 299.51,
        temp_max: 299.51,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 913,
        humidity: 55,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 10.06, deg: 272, gust: 13.26 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-07-07 06:00:00",
    },
  ],
  city: {
    id: 1277333,
    name: "Bengaluru",
    coord: { lat: 12.9566, lon: 77.5984 },
    country: "IN",
    population: 5104047,
    timezone: 19800,
    sunrise: 1688257629,
    sunset: 1688303976,
  },
};
