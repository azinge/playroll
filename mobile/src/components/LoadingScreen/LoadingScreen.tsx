/**
 * LoadingScreen
 */

import * as React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";

export default class LoadingScreen extends React.Component {
  render() {
    const { width, height } = Dimensions.get("window");

    return (
      <View
        style={{
          backgroundColor: "purple",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../../assets/loading.png")}
          resizeMode="cover"
          style={{ height: height, width: width }}
        />
      </View>
    );
  }
}
