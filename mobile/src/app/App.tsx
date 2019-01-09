import React, { Component } from "react";
import { Tabs } from "./router";
import { ApolloProvider } from "react-apollo";
import { SafeAreaView } from "react-native";
import { client } from "../graphql/client";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ApolloProvider client={client}>
          <Tabs />
        </ApolloProvider>
      </SafeAreaView>
    );
  }
}
