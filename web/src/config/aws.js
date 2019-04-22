export default {
  dev: {
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:5428cbc4-d9c4-402d-bdfb-d0fe64ba8066',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_u1L3OQa8W',
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '3gvfjnh67m86026e6g5vkaiegs',
      },
      API: {
        graphql_endpoint:
          'https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/admin_graphql',
        graphql_endpoint_iam_region: 'us-west-2',
        // graphql_endpoint: 'http://localhost:4445/admin_graphql',
      },
    },
  },
};
