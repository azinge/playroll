/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Alert} from "react-native";
import { Icon } from "react-native-elements";
import Create from "../Create";
import { createStackNavigator } from 'react-navigation';

import styles from "./Home.styles";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ backgroundColor: "#6A0070", flexDirection: "row" }}>
          <Text style={styles.headline}>Hi Eddie </Text>
          <Icon
            type="material-community"
            name="language-go"
            size={35}
            color="#ffffff"
            onPress={() => this.props.navigation.navigate('Create')}
          />
          <Icon
            type="material-community"
            name="magnify"
            size={35}
            color="#ffffff"
          />
          <Icon
            type="material-community"
            name="menu"
            size={35}
            color="#ffffff"
          />
        </View>
        <ScrollView>
          <Text style={styles.welcome}>Try to scroll me!</Text>
          <Text style={styles.welcome}>Try to scroll me!</Text>
          <Text style={styles.welcome}>Try to scroll me!</Text>
          <Text style={styles.welcome}>Try to scroll me!</Text>
          <Text style={styles.welcome}>Try to scroll me!</Text>
        </ScrollView>
      </View>
    );
  }
}
