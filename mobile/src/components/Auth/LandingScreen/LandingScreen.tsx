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
} from 'react-native';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import Errors from '../../shared/Modals/Errors';
import { SignInMutation } from '../../../graphql/requests/Auth';

import styles from './LandingScreen.styles';
import NavigationService from '../../../services/NavigationService';
import DropdownAlert from 'react-native-dropdownalert';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  password: string;
  error?: string;
  displayErrorModal: boolean;
  triggerSignIn: boolean;
}

export default class LandingScreen extends React.Component<Props, State> {
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
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {this.renderForm()}
        {this.renderFooter()}
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
  }
}
