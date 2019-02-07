/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";

import styles from "./HeaderBar.styles";
import { NavigationScreenProp } from "react-navigation";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class HeaderBar extends React.Component<Props, State> {
  render() {
    return (
      <View style={{ backgroundColor: "#6A0070", flexDirection: "row" }}>
        <Text style={styles.headline}>Playroll </Text>
        <Icon
          type="material-community"
          name="language-go"
          size={35}
          color="#ffffff"
          onPress={() =>
            this.props.navigation && this.props.navigation.navigate("Profile")
          }
        />
        <Icon
          type="material-community"
          name="magnify"
          size={35}
          color="#ffffff"
        />
        <Icon type="material-community" name="menu" size={35} color="#ffffff" />
      </View>
    );
  }
}
