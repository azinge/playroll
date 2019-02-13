/**
 * SignUpScreen
 */

import * as React from "react";
import {
  ActivityIndicator,
  Text, TextInput,
  TouchableOpacity, View,
  TouchableWithoutFeedback,
  Keyboard, Platform, Linking,
  SafeAreaView, Switch
} from 'react-native';
import SafariView from 'react-native-safari-view';
import { NavigationScreenProp } from "react-navigation";
import { SignUpMutation } from "../../../graphql/requests/Auth";
import styles from './SignUpScreen.styles';

export interface Props {
  toggleSignUp?: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  email: string;
  avatar: string;
  error?: string;
}

export default class SignUpScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      showPassword: true,
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png",
      error: undefined,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleOpenTOSURL() {
    const url = 'http://www.playroll.io/tos';
    if (Platform.OS === 'ios') {
      return SafariView.show({ url, fromBottom: true });
    }
    Linking.openURL(url);
  }

  renderHeader() {
    return (
      <View style={styles.signupHeader}>
        <Text style={styles.signupText}>Sign Up</Text>
      </View>
    )
  }

  termsOfServiceLink() {
    return(
      <TouchableOpacity
        onPress={() => this.handleOpenTOSURL()}
        style={styles.tosContainer}
        >
        <Text style={styles.tosLink}>By signing up, you are agreeing to our Terms of Service.</Text>
      </TouchableOpacity>
    );
  }

  renderSignupButton() {
    return (
      <SignUpMutation
        variables={{
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          avatar: this.state.avatar,
        }}
      >
        {(signUp, { loading, data }) => {
          return (
            <TouchableOpacity
              onPress={() => signUp()}
              style={styles.submitButton}
            >
              {loading
                ? <ActivityIndicator color={'white'}/>
                : <Text style={styles.submitButtonText}>Sign Up</Text>
              }
            </TouchableOpacity>
          );
        }}
      </SignUpMutation>
    );
  }

  renderError() {
    return (
      <Text style={styles.errorMessage}>
        {this.state.error}
      </Text>
    )
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderHeader()}
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              style={styles.inputContainer}
              onChangeText={(username: string) => this.setState({ username })}
              autoCapitalize={"sentences"}
              value={this.state.username}
            />
            <TextInput
              placeholder="Email"
              style={styles.inputContainer}
              onChangeText={(email: string) => this.setState({ email })}
              autoCapitalize={"none"}
              value={this.state.email}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.passwordField}
                onChangeText={(password: string) => this.setState({ password })}
                secureTextEntry={this.state.showPassword}
                value={this.state.password}
              />
              <Switch
                onValueChange={this.toggleSwitch}
                value={!this.state.showPassword}
              />
            </View>
            <TextInput //TODO: Remove Later
              style={styles.inputContainer}
              autoCapitalize="none"
              placeholder="Avatar link"
              onChangeText={(avatar: string) => this.setState({ avatar })}
              value={this.state.avatar}
            />
            {this.termsOfServiceLink()}
            {this.renderError()}
          </View>
          {this.renderSignupButton()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
 }
