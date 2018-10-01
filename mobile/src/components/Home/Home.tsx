/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Text, View } from "native-base";
import { Platform } from "react-native";

import styles from "./Home.styles";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

export default class Home extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to React Native! </Text>
        <Text style={styles.instructions}> To get started, edit App.tsx </Text>
        <Text style={styles.instructions}> {instructions} </Text>
      </View>
    );
  }
}
