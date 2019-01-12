/**
 * LoginScreen
 */

import * as React from "react";
import { Text, View, Button } from "react-native";
import { Auth } from "aws-amplify";
import {
  SIGN_OUT_MUTATION,
  SignOutMutation,
} from "../../graphql/requests/Auth";
import { SIGN_IN_MUTATION, SignInMutation } from "../../graphql/requests/Auth";

export interface Props {}

interface State {
  username: string;
  password: string;
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "Mai",
      password: "Sakurajima123!",
    };
  }
  componentDidMount() {
    // Auth.signIn("test", "Password123!").then(user => console.log(user));
    // Auth.signIn("Mai", "Sakurajima123!").then(user => console.log(user));
    // Auth.currentUserInfo().then(user => console.log(user));
    // Auth.signOut().then(user => console.log(user));
    // Auth.currentUserInfo().then(user => console.log(user));
    //   Auth.signUp({
    //     username: "Mai",
    //     password: "Sakurajima123!",
    //     attributes: {
    //       email: "luker@for4mail.com",
    //     },
    //   })
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err));
    // Auth.confirmSignUp("Mai", "255141").then(user => console.log(user));
  }
  render() {
    return (
      <View>
        <Text>LoginScreen</Text>
        <Button
          title="Current info"
          onPress={() => {
            Auth.currentUserInfo().then(user => console.log(user));
          }}
        />
        <SignInMutation
          mutation={SIGN_IN_MUTATION}
          variables={{
            username: "test",
            password: "Password123!",
          }}
        >
          {(signIn, { data }) => {
            console.log(data);
            return (
              <Button
                title="Sign In"
                onPress={() => {
                  signIn();
                }}
              />
            );
          }}
        </SignInMutation>
        <SignOutMutation mutation={SIGN_OUT_MUTATION}>
          {(signOut, { data }) => (
            <Button
              title="Sign Out"
              onPress={() => {
                signOut();
              }}
            />
          )}
        </SignOutMutation>
      </View>
    );
  }
}
