import React from "react";
import { SafeAreaView } from "react-native";
import { ApolloProvider, Query } from "react-apollo";
import { client } from "../graphql/client";
import { AppContainer } from "../components/router";
import LoadingScreen from "../components/Auth/LoadingScreen";
import { GET_AUTHENTICATION_STATUS } from "../graphql/requests/Auth/GetAuthenticationStatus";

export interface Props {}

interface State {
  appState: "dormant" | "loading" | "ready";
}

export default class App extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      appState: "dormant",
    };
  }
  componentDidMount() {
    this.setState({ appState: "loading" });
    setTimeout(() => {
      this.setState({ appState: "ready" });
    }, 1250);
  }
  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.appState != "ready" ? (
          <LoadingScreen />
        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <AppContainer />
          </SafeAreaView>
        )}
      </ApolloProvider>
    );
  }
}
