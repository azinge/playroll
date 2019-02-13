/**
 * LandingScreen
 */

import * as React from "react";
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";

import styles from "./LandingScreen.styles";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class LandingScreen extends React.Component<Props, State> {
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.optionsContainer}>

          <Image
            // @ts-ignore
            style={styles.image}  // legit prop: https://facebook.github.io/react-native/docs/image
            source={require("../../../assets/new_playroll.png")}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation && this.props.navigation.navigate("SignIn");
            }}
          >
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={styles.signUpText}
            onPress={() => {
              this.props.navigation && this.props.navigation.navigate("SignUp");
            }}
          >Sign Up</Text>
        </View>
      </SafeAreaView>
    );
  }
}
