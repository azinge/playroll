/**
 * LandingScreen
 */

import * as React from "react";
import { Text, View, Button } from "react-native";

export default class LandingScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "white", flex: 2 }}>
          <Text>Playroll</Text>
          <Button
            title="Sign In"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
          <Button
            title="Sign Up"
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
