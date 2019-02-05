/**
 * ProfileScreen
 */

import * as React from "react";
import { Text, View, SafeAreaView, Button } from "react-native";

import styles from "./ProfileScreen.styles";
import { SignOutMutation } from "../../../graphql/requests/Auth";
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from "react-navigation";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class ProfileScreen extends React.Component<Props, State> {
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View>
          <Text>ProfileScreen</Text>
        </View>
        <SignOutMutation>
          {(signOut, { data }) => {
            return (
              <Button
                title="Sign Out"
                onPress={() => {
                  signOut().then(
                    () =>
                      this.props.navigation &&
                      this.props.navigation.dispatch(
                        StackActions.reset({
                          key: null,
                          index: 0,
                          actions: [
                            NavigationActions.navigate({
                              routeName: "Auth",
                            }),
                          ],
                        })
                      )
                  );
                }}
              />
            );
          }}
        </SignOutMutation>
      </SafeAreaView>
    );
  }
}
