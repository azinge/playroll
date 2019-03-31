/**
 * LandingScreen
 */

import * as React from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

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
    this.renderErrorModal = this.renderErrorModal.bind(this);
  }

  renderErrorModal(error) {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.displayErrorModal}
        onRequestClose={() => this.setState({ displayErrorModal: false })}
      >
        <View style={styles.errorModalContainer}>
          <View style={styles.errorModal}>
            <Text style={styles.errorModalTitle}>Error!</Text>
            <Text style={styles.errorDescription}>{error}</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ displayErrorModal: false, error: null });
              }}
            >
              <Text>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleRow}>
          <Image
            style={styles.playrollLogo}
            source={require('../../../assets/new_playroll.png')}
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
      return this.setState({
        error: 'All fields must have a value',
      });
    }
    signIn();
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
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(signIn)}
              style={styles.signInButton}
            >
              <Text style={styles.footerButtonText}>Sign In</Text>
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
