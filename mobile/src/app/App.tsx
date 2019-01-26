import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "../graphql/client";
import { AppContainer } from "./router";
import LoadingScreen from "../components/LoadingScreen";

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LoadingScreen />
        {/* <AppContainer /> */}
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
