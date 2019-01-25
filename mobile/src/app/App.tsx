import React, { Component } from "react";
import { AppNavigator, AuthNavigator } from "./router";
import { ApolloProvider } from "react-apollo";
import { SafeAreaView, View } from "react-native";
import { client } from "../graphql/client";
import LoginScreen from "../components/LoginScreen";
import { Query } from "react-apollo";
import { GET_AUTHENTICATION_STATUS } from "../graphql/requests/Auth/GetAuthenticationStatus";
import { AppContainer } from "./router";
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
        {/* <AuthNavigator /> */}

        {/* <Query query={GET_AUTHENTICATION_STATUS}>
            {({ data, client }) => {
              console.log(data);
              console.log(data.coreData.isAuthenticated);
              if (!data.coreData.isAuthenticated) {
                console.log("Logged in");
                return <AppNavigator />;
              } else {
                console.log("Logged out");
                return <LoginScreen />;
              }
            }}
          </Query> */}
      </ApolloProvider>
    );
  }
}
