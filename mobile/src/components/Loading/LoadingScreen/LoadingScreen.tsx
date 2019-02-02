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
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from "react-navigation";

import styles from "./LoadingScreen.styles";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class LoadingScreen extends React.Component<Props, State> {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation &&
        this.props.navigation.dispatch(
          StackActions.reset({
            key: null,
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Auth" })],
          })
        );
    }, 1250);
  }
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/loading.png")}
          resizeMode="cover"
          style={{ height: height, width: width }}
        />
      </View>
    );
  }
}
