import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import AWS from "aws-sdk";

export default {
  dev: {
    appSync: {
      url: "https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/graphql",
      region: "us-west-2",
      auth: {
        type: AUTH_TYPE.AWS_IAM,
        credentials: () => Auth.currentCredentials(),
      },
    },
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: "us-west-2:5428cbc4-d9c4-402d-bdfb-d0fe64ba8066",
        // REQUIRED - Amazon Cognito Region
        region: "us-west-2",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "us-west-2_u1L3OQa8W",
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: "3gvfjnh67m86026e6g5vkaiegs",
      },
    },
  },
};
