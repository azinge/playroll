/**
 * ManageRollScreen
 */

import * as React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { Button } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import { MusicSource } from "graphql/types";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class ManageRollScreen extends React.Component<Props, State> {
  render() {
    const currentSource =
      this.props.navigation && this.props.navigation.getParam("currentSource");
    console.log(currentSource.cover);
    return (
      <SafeAreaView>
        <Text>ManageRollScreen</Text>
        <Text>{currentSource.name}</Text>
        <Text>{currentSource.type}</Text>

        <Button title="Add To Playroll" onPress={() => {}} />
        <Button title="Add To Discovery Queue" onPress={() => {}} />
        <Button title="Recommend to Friend" onPress={() => {}} />
      </SafeAreaView>
    );
  }
}
