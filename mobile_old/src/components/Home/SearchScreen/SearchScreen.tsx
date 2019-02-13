/**
 * SearchScreen
 */

import React from "react";
import { View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import Search from "../../shared/Search/Search";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

export default class SearchScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <Header
          backgroundColor="purple"
          outerContainerStyles={{ marginBottom: -1 }}
          centerComponent={{
            text: "Search",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        <Search navigation={this.props.navigation} />
      </View>
    );
  }
}
