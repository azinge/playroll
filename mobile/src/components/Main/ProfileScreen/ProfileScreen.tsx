/**
 * ProfileScreen
 */

import * as React from "react";
import { Text, View } from "react-native";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Text>ProfileScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
