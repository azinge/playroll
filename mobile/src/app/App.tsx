/**
 * Application component for Playroll mobile application.
 */

import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import { ApolloClient } from "apollo-client";
import Home from "../components/Home";
import awsconfig from "../config/aws.js";
import gql from "graphql-tag";
import { HttpLink } from "apollo-link-http";
import { Signer, Platform, Credentials } from "@aws-amplify/core";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import AWS from "aws-sdk";
import { print } from "graphql/language/printer";
import * as Url from "url";
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";

Amplify.configure(awsconfig.dev.amplify);

// const client = new AWSAppSyncClient(awsconfig.dev.appSync);

const client = new ApolloClient({
  link: createAppSyncLink(awsconfig.dev.appSync),
  cache: new InMemoryCache(),
});

setTimeout(() => {
  client
    .mutate({
      mutation: gql`
        mutation {
          listPlayrolls {
            name
          }
        }
      `,
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}, 5000);

export default class App extends Component {
  render() {
    return <Home />;
  }
}
