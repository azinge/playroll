/**
 * SignInScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Switch,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';

import { SignInMutation } from '../../../graphql/requests/Auth';

import styles from './SignInScreen.styles';

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
  error?: string;
}

export default class SignInScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: 'test',
      password: 'Password123!',
      showPassword: true,
      signedUp: true,
      error: undefined,
    };
    this.revealPassword = this.revealPassword.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  renderError() {
    return <Text style={styles.errorMessage}>{this.state.error}</Text>;
  }

  revealPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  toggleSignUp() {
    this.props.navigation && this.props.navigation.navigate('SignUp');
  }

  renderHeader() {
    return (
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Log In</Text>
      </View>
    );
  }

  toggleSignIn(signIn) {
    signIn().then(
      () =>
      this.props.navigation &&
      this.props.navigation.dispatch(
        StackActions.reset({
          key: null,
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        })
      )
    );
  }

  renderSigninButton() {
    return (
      <SignInMutation
        variables={{
          username: this.state.username,
          password: this.state.password,
        }}
      >
        {(signIn, { loading, error, data }) => {
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(signIn)}
              style={styles.submitButton}
            >
              {loading ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <Text style={styles.submitButtonText}>Sign In</Text>
                )}
            </TouchableOpacity>
          );
        }}
      </SignInMutation>
    );
  }

  validateInput(signIn) {
    if (this.state.username === '' ||
        this.state.password === '') {
          return this.setState({
            error: 'All fields must have a value'
          }, () => {
            setTimeout(() => {this.setState({ error: null })}, 3000);
          });
    }
    signIn().then(
      () =>
      this.props.navigation &&
      this.props.navigation.dispatch(
        StackActions.reset({
          key: null,
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        })
      )
    );
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
            {this.renderError()}
            <TextInput
              placeholder='Username'
              autoCapitalize='none'
              style={styles.inputContainer}
              onChangeText={(username: string) => this.setState({ username })}
              value={this.state.username}
            />
            <TextInput
              placeholder='Password'
              secureTextEntry={this.state.showPassword}
              autoCapitalize='none'
              style={styles.inputContainer}
              onChangeText={(password: string) => this.setState({ password })}
              value={this.state.password}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={styles.showPasswordText}>Show Password</Text>
              <Switch
                  onValueChange={this.revealPassword}
                  value={!this.state.showPassword}
                  style={{marginTop: 25, marginLeft: 10}}
              />
            </View>
          </View>
          {this.renderSigninButton()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
