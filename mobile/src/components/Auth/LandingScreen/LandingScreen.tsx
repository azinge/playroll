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
} from 'react-native';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import Errors from '../../shared/Modals/Errors';
import { SignInMutation } from '../../../graphql/requests/Auth';

import styles from './LandingScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  password: string;
  error?: string;
  displayErrorModal: boolean;
}

export default class LandingScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      displayErrorModal: false,
    };

    this.renderForm = this.renderForm.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
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

  validateInput(signIn) {
    if (this.state.username === '' || this.state.password === '') {
      return this.handleErrors('All fields must have a value');
    }
    signIn().then(response => {
      console.log('signIn promise resolved()', response);
      const { data, error } = response.data.signIn;
      if (error) {
        return this.handleErrors(error.message);
      }
      if (!data) return;
      console.log('segue to Main');
      if (this.props.navigation) {
        this.props.navigation.dispatch(
          StackActions.reset({
            key: null,
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          }),
        );
      }
    });
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
          if (error && error.message) {
            this.handleErrors(error.message);
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
          this.props.navigation && this.props.navigation.navigate('SignUp');
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
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderForm()}
        {this.renderFooter()}
        {this.renderErrorModal(this.state.error)}
      </View>
    );
  }
}
