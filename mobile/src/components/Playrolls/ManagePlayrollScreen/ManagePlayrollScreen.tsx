/**
 * ManagePlayrollScreen
 */

import * as React from "react";
import { Text, View, SafeAreaView, TextInput, Button } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderBackButton, NavigationScreenProp } from "react-navigation";

import styles from "./ManagePlayrollScreen.styles";
import {
  CreatePlayrollMutation,
  CREATE_PLAYROLL_MUTATION,
} from "../../../graphql/requests/Playroll/";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class ManagePlayrollScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: "",
    };
  }
  render() {
    return (
      <View style={styles.screenContainer}>
        <Header
          backgroundColor="purple"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              onPress={() => this.props.navigation.goBack(null)}
              underlayColor="purple"
            />
          }
          centerComponent={{
            text: "Manage Playrolls",
            style: { color: "#fff", fontSize: 20 },
          }}
          rightComponent={
            <Icon
              name="save"
              color="white"
              onPress={() => this.props.navigation.navigate("Tracklist")}
            />
          }
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={text => this.setState({ editPlayrollName: text })}
          value={this.state.editPlayrollName}
        />
        <CreatePlayrollMutation
          mutation={CREATE_PLAYROLL_MUTATION}
          variables={{
            input: { userID: 1, name: this.state.editPlayrollName },
          }}
          refetchQueries={["GET_PLAYROLLS"]}
        >
          {(createPlayroll, { data }) => (
            <Button
              title="Add Playroll"
              onPress={() => {
                createPlayroll();
              }}
            />
          )}
        </CreatePlayrollMutation>
      </View>
    );
  }
}
