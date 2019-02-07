/**
 * BrowseFriendsScreen
 */

import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowseFriendsScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>BrowseFriendsScreen</Text>
        <Button
          title="Add Friend"
          onPress={() => {
            this.props.navigation &&
              this.props.navigation.navigate("AddFriend");
          }}
        />
      </View>
    );
  }
}
