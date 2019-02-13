/**
 * SignInScreen
 */

import * as React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Switch,
  SafeAreaView,
} from "react-native";
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from "react-navigation";

import { SignInMutation } from "../../../graphql/requests/Auth";

import styles from "./SignInScreen.styles";

export interface Props {
  onLoginPress?: () => void;
  onLogoutPress?: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  signedUp: boolean;
}

export default class SignInScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "test",
      password: "Password123!",
      showPassword: true,
      signedUp: true,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  toggleSignUp() {
    this.props.navigation && this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.optionsContainer}>
          <Text>Log In</Text>
          <TextInput
            style={styles.usernameField}
            autoCapitalize="none"
            onChangeText={(username: string) => this.setState({ username })}
            value={this.state.username}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={this.state.showPassword}
              autoCapitalize="none"
              style={styles.passwordField}
              onChangeText={(password: string) => this.setState({ password })}
              value={this.state.password}
            />
            <Switch
              onValueChange={this.toggleSwitch}
              value={!this.state.showPassword}
            />
          </View>
          <SignInMutation
            variables={{
              username: this.state.username,
              password: this.state.password,
            }}
          >
            {(signIn, { data }) => {
              return (
                <Button
                  title="Sign In"
                  onPress={() => {
                    signIn().then(
                      () =>
                        this.props.navigation &&
                        this.props.navigation.dispatch(
                          StackActions.reset({
                            key: null,
                            index: 0,
                            actions: [
                              NavigationActions.navigate({ routeName: "Home" }),
                            ],
                          })
                        )
                    );
                  }}
                />
              );
            }}
          </SignInMutation>
        </View>
      </SafeAreaView>
    );
  }
}