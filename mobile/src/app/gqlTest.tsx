import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../config/aws.js";
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsconfig.dev.amplify);

Auth.currentCredentials()
  .then(creds => console.log(creds))
  .catch(err => console.log(err));

export const getClient = () => {
  return new AWSAppSyncClient(awsconfig.dev.appSync, {
    connectToDevTools: true,
  });
};

setTimeout(() => {
  getClient()
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
