/**
 * LoginScreen
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
import { Auth } from "aws-amplify";
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from "react-navigation";

import {
  SIGN_IN_MUTATION,
  SignInMutation,
} from "../../../graphql/requests/Auth";

import styles from "./LoginScreen.styles";

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

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "Mai",
      password: "Sakurajima123!",
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

          <Button
            title="Current info"
            onPress={() => {
              Auth.currentUserInfo().then(user => console.log(user));
            }}
          />
          <SignInMutation
            mutation={SIGN_IN_MUTATION}
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
                              NavigationActions.navigate({ routeName: "Main" }),
                            ],
                          })
                        )
                    );
                  }}
                />
              );
            }}
          </SignInMutation>
          {/* <Button
          title="Don't have an account? Sign up here"
          onPress={this.toggleSignUp}
        /> */}
        </View>
      </SafeAreaView>
    );
  }
}
