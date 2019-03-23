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
import NavigationService from '../../../services/NavigationService';
import { Icon } from 'react-native-elements';

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
      username: '',
      password: '',
      showPassword: true,
      signedUp: true,
    };
    this.revealPassword = this.revealPassword.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  revealPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  toggleSignUp() {
    NavigationService.navigate('SignUp');
  }

  renderSegueToSignIn() {
    return (
      <TouchableOpacity
        style={styles.segueToSignInContainer}
        onPress={() => {
          NavigationService.goBack();
        }}
      >
        <Icon
          name='arrow-back'
          type='material'
          color='#6A0070'
          onPress={() => {
            NavigationService.goBack();
          }}
        />
        <Text style={styles.signInTitle}>Sign In</Text>
      </TouchableOpacity>
    );
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
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
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
        {/* What does error mean down here  */}
        {(signIn, { loading, error, data }) => {
          return (
            <TouchableOpacity
              onPress={() => this.toggleSignIn(signIn)}
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

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderSegueToSignIn()}
            {this.renderHeader()}
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.showPasswordText}>Show Password</Text>
              <Switch
                onValueChange={this.revealPassword}
                value={!this.state.showPassword}
                style={{ marginTop: 25, marginLeft: 10 }}
              />
            </View>
          </View>
          {this.renderSigninButton()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
