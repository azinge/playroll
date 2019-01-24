import React, { Component } from "react";
import { Navigator } from "./router";
import { ApolloProvider } from "react-apollo";
import { SafeAreaView, View } from "react-native";
import { client } from "../graphql/client";
import LoginScreen from "../components/LoginScreen";
import { Query } from "react-apollo";
import { GET_AUTHENTICATION_STATUS } from "../graphql/requests/Auth/GetAuthenticationStatus";

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_AUTHENTICATION_STATUS}>
          {({ data, client }) => {
            console.log(data);
            console.log(data.coreData.isAuthenticated);
            if (data.coreData.isAuthenticated) {
              console.log("Logged in");
              return (
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                  <ApolloProvider client={client}>
                    <Navigator />
                  </ApolloProvider>
                </SafeAreaView>
              );
            } else {
              console.log("Logged out");
              return (
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                  <ApolloProvider client={client}>
                    <LoginScreen />
                  </ApolloProvider>
                </SafeAreaView>
              );
            }
          }}
        </Query>
      </ApolloProvider>
    );
  }
}
