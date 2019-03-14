/**
 * SignUpScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Linking,
  SafeAreaView,
  Switch,
} from 'react-native';
import { WebBrowser } from 'expo';
import { NavigationScreenProp } from 'react-navigation';
import { SignUpMutation } from '../../../graphql/requests/Auth';
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
      username: '',
      email: '',
      password: '',
      showPassword: true,
      avatar: '',
      error: undefined,
    };
    this.displayPassword = this.displayPassword.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  displayPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleOpenTOSURL() {
    const url = 'http://www.playroll.io/tos';
    if (Platform.OS === 'ios') {
      WebBrowser.openBrowserAsync(url);
    }
    // Linking.openURL(url);
    WebBrowser.openBrowserAsync(url);
  }

  validateInput(signUp) {
    if (this.state.username === '' || this.state.email === '' ||
        this.state.password === '' || this.state.avatar === '') {
          return this.setState({
            error: 'All fields must have a value'
          }, () => {
            setTimeout(() => {this.setState({ error: null })}, 3000);
          });
    }
    signUp();
  }

  renderHeader() {
    return (
      <View style={styles.signupHeader}>
        <Text style={styles.signupText}>Sign Up</Text>
      </View>
    );
  }

  termsOfServiceLink() {
    return (
      <TouchableOpacity
        onPress={() => this.handleOpenTOSURL()}
        style={styles.tosContainer}
      >
        <Text style={styles.tosLink}>
          By signing up, you are agreeing to our Terms of Service.
        </Text>
      </TouchableOpacity>
    );
  }

  renderPasswordButton() {
    if (this.state.password.length > 1) {
      return (
        <TouchableOpacity
          onPress={() => this.displayPassword()}
          style={styles.showPasswordButton}
        >
          <Text style={styles.tosLink}>
            Show Password
          </Text>
        </TouchableOpacity>
      );
    }
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
        {(signUp, { loading, error, data }) => {
          if (data) {
            this.props.navigation.navigate("Confirmation");
          }
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(signUp)}
              style={styles.submitButton}
            >
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.submitButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          );
        }}
      </SignUpMutation>
    );
  }

  renderError() {
    return <Text style={styles.errorMessage}>{this.state.error}</Text>;
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderHeader()}
            <TextInput
              placeholder='Username'
              autoCapitalize='none'
              style={styles.inputContainer}
              onChangeText={(username: string) => this.setState({ username })}
              autoCapitalize={'sentences'}
              value={this.state.username}
            />
            <TextInput
              placeholder='Email'
              style={styles.inputContainer}
              onChangeText={(email: string) => this.setState({ email })}
              autoCapitalize={'none'}
              value={this.state.email}
            />
            <TextInput
              placeholder='Password'
              style={styles.inputContainer}
              onChangeText={(password: string) => this.setState({ password })}
              secureTextEntry={this.state.showPassword}
              value={this.state.password}
            />
            {this.renderPasswordButton()}
            <TextInput // TODO: Remove Later
              style={styles.avatarContainer}
              autoCapitalize='none'
              placeholder='Avatar link'
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
