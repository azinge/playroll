/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Text, View, ScrollView } from "react-native";
import HeaderBar from "../../components/shared/HeaderBar";
import HomeCarousel from "./HomeCarousel";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar />
        <Text>Home | Playrolls | Radio</Text>
        <HomeCarousel />
        <Text>Popular | New | Recommended</Text>
        <ScrollView horizontal={true}>
          <Text>Hello </Text>
          <Text>Hello </Text>
          <Text>Hello </Text>
          <Text>Hello </Text>
          <Text>Hello </Text>
        </ScrollView>
      </View>
    );
  }
}
