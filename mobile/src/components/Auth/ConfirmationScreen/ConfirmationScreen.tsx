/**
 * Signup component for Playroll mobile application.
 */

import React from "react";
import {
  Text, TextInput,
  ActivityIndicator,
  SafeAreaView, View,
  TouchableOpacity, Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ConfirmSignUpMutation } from "../../../graphql/requests/Auth";
import styles from './styles';

export interface Props {
  toggleSignUp: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  authCode: string;
  confirmUser: string;
  error?: string
}

 export default class ConfirmationScreen extends React.Component<Props, State> {
   constructor(props: Props) {
    super(props);

    this.state = {
      authCode: "",
      confirmUser: "",
      error: undefined,
    };

    this.renderError = this.renderError.bind(this);
  }

  renderHeader() {
    return (
      <View style={styles.confirmationHeader}>
        <Text style={styles.signupText}>Confirm Account</Text>
      </View>
    )
  }

  renderInputField() {
    return (
      <TextInput
        placeholder="Confirmation Code"
        style={styles.inputContainer}
        onChangeText={text => this.setState({ confirmationCode: text.trim() })}
        autoCapitalize={'sentences'}
        value={this.state.confirmationCode}
      />
    )
  }

  renderConfirmButton() {
    return (
      <ConfirmSignUpMutation
        variables={{
          username: this.state.confirmUser,
          code: this.state.authCode,
        }}
      >
        {(confirmSignUp, { loading, data }) => {
          return (
            <TouchableOpacity
              onPress={() => confirmSignUp()}
              style={styles.submitButton}
            >
              {loading
                ? <ActivityIndicator color={'white'}/>
                : <Text style={styles.submitButtonText}>Confirm</Text>
              }
            </TouchableOpacity>
          );
        }}
      </ConfirmSignUpMutation>
    )
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
            {this.renderInputField()}
            {this.renderError()}
          </View>
          {this.renderConfirmButton()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
 }
