/**
 * Application component for Playroll mobile application.
 */

import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import Home from "../components/Home";
import awsconfig from "../config/aws.js";
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsconfig.dev.amplify);

const client = new AWSAppSyncClient(awsconfig.dev.appSync);

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
