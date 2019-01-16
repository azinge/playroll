import React, { Component } from "react";
import { Navigator } from "./router";
import { ApolloProvider } from "react-apollo";
import { SafeAreaView, View } from "react-native";
import { client } from "../graphql/client";
import LoginScreen from "../components/LoginScreen";

export interface Props {}

interface State {
  isLoggedIn: boolean;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }
  onLoginPress() {
    this.setState({ isLoggedIn: true });
  }

  onLogoutPress() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    if (this.state.isLoggedIn) {
      console.log("Logged in");
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ApolloProvider client={client}>
            <Navigator screenProps={this.onLogoutPress} />
          </ApolloProvider>
        </SafeAreaView>
      );
    } else if (!this.state.isLoggedIn) {
      console.log("Logged out");
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ApolloProvider client={client}>
            <LoginScreen onLoginPress={this.onLoginPress} />
          </ApolloProvider>
        </SafeAreaView>
      );
    }
  }
}
