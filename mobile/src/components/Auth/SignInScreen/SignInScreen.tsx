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
import DropdownAlert from 'react-native-dropdownalert';

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
  triggerSignIn: boolean;
}

export default class SignInScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: true,
      signedUp: true,
      triggerSignIn: false,
    };
    this.revealPassword = this.revealPassword.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  componentDidMount() {
    const username =
      this.props.navigation && this.props.navigation.getParam('username');
    const password =
      this.props.navigation && this.props.navigation.getParam('password');
    if (username) {
      this.setState({
        username,
        password: password,
        triggerSignIn: !!password,
      });
    }
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

  async signInWrapper(signIn) {
    try {
      await signIn({
        variables: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      NavigationService.dispatch(
        StackActions.reset({
          key: null,
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        })
      );
    } catch (err) {
      console.log(err);
      if (err.code === 'UserNotConfirmedException') {
        NavigationService.navigate('Confirmation', {
          username: this.state.username,
        });
      } else if (err.code === 'NotAuthorizedException') {
        this.dropdown.alertWithType('error', 'Error', 'Incorrect Password.');
      } else if (err.code === 'UserNotFoundException') {
        this.dropdown.alertWithType('error', 'Error', 'Could not find User.');
      } else {
        console.log(err);
        this.dropdown.alertWithType(
          'error',
          'Error',
          "We're sorry, Please try again."
        );
      }
    }
  }

  renderSigninButton() {
    return (
      <SignInMutation>
        {(signIn, { loading }) => {
          if (this.state.triggerSignIn) {
            this.setState({ triggerSignIn: false }, () => {
              this.signInWrapper(signIn);
            });
          }
          return (
            <TouchableOpacity
              onPress={() => this.signInWrapper(signIn)}
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
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
