/**
 * ProfileScreen
 */

import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import styles from "./ProfileScreen.styles";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View>
          <Text>ProfileScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
