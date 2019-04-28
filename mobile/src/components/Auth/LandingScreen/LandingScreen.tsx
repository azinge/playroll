/**
 * LandingScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import Errors from '../../shared/Modals/Errors';
import { SignInMutation } from '../../../graphql/requests/Auth';
import { withOAuth } from 'aws-amplify-react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import styles from './LandingScreen.styles';
import NavigationService from '../../../services/NavigationService';
import DropdownAlert from 'react-native-dropdownalert';
import { SocialIcon, Button } from 'react-native-elements';
import { Linking, WebBrowser } from 'expo';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
  googleSignIn?: () => void;
  facebookSignIn?: () => void;
  oAuthUser?: any;
}

interface State {
  username: string;
  password: string;
  error?: string;
  displayErrorModal: boolean;
  triggerSignIn: boolean;
}

class LandingScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      displayErrorModal: false,
      triggerSignIn: false,
    };

    this.renderForm = this.renderForm.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
  }

  handleRedirect(result) {
    console.log(result);
    if (result.url) {
      WebBrowser.dismissBrowser();
    } else {
      return this.dropdown.alertWithType(
        'error',
        'Error',
        'Error signing up with external provider.'
      );
    }
  }

  componentDidMount() {
    const username =
      this.props.navigation && this.props.navigation.getParam('username');
    const password =
      this.props.navigation && this.props.navigation.getParam('password');
    const triggerSignIn =
      this.props.navigation && this.props.navigation.getParam('triggerSignIn');

    if (username) {
      this.setState({
        username,
        password,
        triggerSignIn,
      });
    }

    Linking.addEventListener('url', this.handleRedirect);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleRedirect);
  }

  handleErrors(error) {
    this.setState({
      error,
      displayErrorModal: true,
    });
  }

  handleCloseErrorModal() {
    this.setState({ displayErrorModal: false, error: null });
  }

  renderErrorModal(error) {
    return (
      <Errors
        displayErrorModal={this.state.displayErrorModal}
        error={error}
        onPress={this.handleCloseErrorModal}
      />
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleRow}>
          <Image
            style={styles.playrollLogo}
            source={require('../../../../assets/playroll_icon.png')}
          />
          <Text style={styles.headerTitleLabel}>Playroll</Text>
        </View>
        <View style={styles.headerDescriptionContainer}>
          <Text style={styles.headerDescriptionLabel}>
            Playlists Made Better
          </Text>
        </View>
      </View>
    );
  }

  renderForm() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            placeholder='john.smith@example.com'
            style={styles.inputField}
            onChangeText={(username: string) => this.setState({ username })}
            autoCapitalize={'none'}
            value={this.state.username}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder='*********'
            style={styles.inputField}
            onChangeText={(password: string) => this.setState({ password })}
            secureTextEntry={true}
            value={this.state.password}
          />
        </View>
        {this.renderSocialLogin()}
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
    } catch (err) {
      console.log(err);
      if (err.code === 'UserNotConfirmedException') {
        NavigationService.navigate('Confirmation', {
          username: this.state.username,
          triggerResendSignUp: true,
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

  validateInput(signIn) {
    if (this.state.username === '' || this.state.password === '') {
      return this.dropdown.alertWithType(
        'error',
        'Error',
        'All fields must have a value.'
      );
    }
    this.signInWrapper(signIn);
  }

  renderSignInButton() {
    return (
      <SignInMutation
        variables={{
          username: this.state.username,
          password: this.state.password,
        }}
      >
        {(signIn, { error, loading, data }) => {
          if (this.props.oAuthUser) {
            NavigationService.dispatch(
              StackActions.reset({
                key: null,
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
              })
            );
          }
          if (this.state.triggerSignIn) {
            this.setState({ triggerSignIn: false }, () => {
              this.signInWrapper(signIn);
            });
          }
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(signIn)}
              style={styles.signInButton}
            >
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.footerButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          );
        }}
      </SignInMutation>
    );
  }

  renderRegisterButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate('SignUp');
        }}
        style={styles.registerButton}
      >
        <Text style={styles.footerButtonText}>Register</Text>
      </TouchableOpacity>
    );
  }

  renderSocialLogin() {
    return (
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <SocialIcon
          title='Facebook Sign In'
          button
          type='facebook'
          style={{ flex: 1 }}
          onPress={this.props.facebookSignIn}
        />
        <SocialIcon
          title='Google Sign In'
          button
          type='google-plus-official'
          style={{ flex: 1 }}
          onPress={this.props.googleSignIn}
        />
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footerRow}>
        {this.renderSignInButton()}
        {this.renderRegisterButton()}
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          {this.renderForm()}
          {this.renderFooter()}
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default withOAuth(LandingScreen);
