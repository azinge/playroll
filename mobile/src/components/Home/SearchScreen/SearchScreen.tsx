/**
 * SearchScreen
 */

import React from "react";
import { View } from "react-native";
import { Header, Icon } from "react-native-elements";
import Search from "../../shared/Search/Search";

export default class SearchScreen extends React.Component {
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
        <Search />
      </View>
    );
  }
}
