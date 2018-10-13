import React, { Component } from "react";
import { Tabs } from "./config/router";
import { ApolloProvider } from "react-apollo";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../config/aws.js";
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsconfig.dev.amplify);

Auth.currentCredentials()
  .then(creds => console.log(creds))
  .catch(err => console.log(err));

const client = new AWSAppSyncClient(awsconfig.dev.appSync, {
  connectToDevTools: true,
});

setTimeout(() => {
  client
    .query({
      query: gql`
        {
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
    return (
      <ApolloProvider client={client}>
        <Tabs />
      </ApolloProvider>
    );
  }
}
