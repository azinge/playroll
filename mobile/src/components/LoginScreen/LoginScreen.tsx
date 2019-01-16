/**
 * LoginScreen
 */

import * as React from "react";
import { Text, View, Button, TextInput, Switch } from "react-native";
import { Auth } from "aws-amplify";
import { SIGN_IN_MUTATION, SignInMutation } from "../../graphql/requests/Auth";

export interface Props {
  onLoginPress?: () => void;
  onLogoutPress?: () => void;
}

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "Mai",
      password: "Sakurajima123!",
      showPassword: true,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
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
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          autoCapitalize="none"
          onChangeText={(username: string) => this.setState({ username })}
          value={this.state.username}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            secureTextEntry={this.state.showPassword}
            autoCapitalize="none"
            style={{ flex: 4, height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(password: string) => this.setState({ password })}
            value={this.state.password}
          />
          <Switch
            onValueChange={this.toggleSwitch}
            value={!this.state.showPassword}
          />
        </View>

        <Button
          title="Current info"
          onPress={() => {
            Auth.currentUserInfo().then(user => console.log(user));
          }}
        />
        <SignInMutation
          mutation={SIGN_IN_MUTATION}
          variables={{
            username: this.state.username,
            password: this.state.password,
          }}
        >
          {(signIn, { data }) => {
            return (
              <Button
                title="Sign In"
                onPress={() => {
                  signIn().then(this.props.onLoginPress);
                }}
              />
            );
          }}
        </SignInMutation>
      </View>
    );
  }
}
