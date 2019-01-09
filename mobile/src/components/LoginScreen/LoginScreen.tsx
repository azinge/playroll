/**
 * LoginScreen
 */

import * as React from "react";
import { Text, View } from "react-native";
import { Auth } from "aws-amplify";

export default class LoginScreen extends React.Component {
  componentDidMount() {
    Auth.signIn("test", "Password123!").then(user => console.log(user));
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
      </View>
    );
  }
}
