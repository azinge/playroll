import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import AWS from "aws-sdk";

export default {
  dev: {
    appSync: {
      url: "https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/graphql",
      region: "us-west-2",
      auth: {
        // type: AUTH_TYPE.API_KEY,
        // apiKey: AppSync.apiKey
        type: AUTH_TYPE.AWS_IAM,
        //Note - Testing purposes only
        credentials: () =>
          new AWS.Credentials({
            accessKeyId: "AKIAIWAG6RLF7QMDNJGA",
            secretAccessKey: "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",
          }),
        //IAM Cognito Identity using AWS Amplify
        //credentials: () => Auth.currentCredentials(),
        //Cognito User Pools using AWS Amplify
        // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
      },
    },
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: "us-west-2:5428cbc4-d9c4-402d-bdfb-d0fe64ba8066",
        // REQUIRED - Amazon Cognito Region
        region: "us-west-2",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "XX-XXXX-X_abcd1234",
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: "XX-XXXX-X_abcd1234",
      },
    },
  },
};
