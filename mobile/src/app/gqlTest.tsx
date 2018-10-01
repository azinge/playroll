import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../shared/config/aws.js";
import gql from "graphql-tag";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsconfig.dev.amplify);

Auth.currentCredentials()
  .then(creds => console.log(creds))
  .catch(err => console.log(err));

const client = new AWSAppSyncClient(awsconfig.dev.appSync);

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
