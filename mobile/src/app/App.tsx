import React, { Component } from "react";
import { Tabs } from "./config/router";
import { ApolloProvider } from "react-apollo";
import Amplify, { Auth } from "aws-amplify";
import Signer from "aws-appsync/lib/link/signer/signer";
import awsconfig from "../config/aws.js";
import Url from "url";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { SafeAreaView } from "react-native";

Amplify.configure(awsconfig.dev.amplify);

const fetcher = async (uri, { method, body }) => {
  const {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  } = await Auth.currentCredentials();

  console.log("Hello");

  // console.warn("CREDENTIALS:", { accessKeyId, secretAccessKey, sessionToken });

  const { host, path } = Url.parse(uri);
  const formatted = {
    method,
    body,
    service: "execute-api",
    region: "us-west-2",
    url: uri,
    host,
    path,
  };

  // console.warn("REQUEST:", formatted);

  const signedRequest = Signer.sign(formatted, {
    access_key: accessKeyId,
    secret_key: secretAccessKey,
    session_token: sessionToken,
  });

  // console.warn({ ...signedRequest, headers: "", body: "" });

  return fetch(uri, signedRequest);
};

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: "https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/graphql/",
    uri: "http://localhost:4445/graphql",
    fetch: fetcher,
  }),
  cache: new InMemoryCache(),
});

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
