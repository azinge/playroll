export default {
  local: {
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:9c8c7b81-e599-4570-8b2b-b0a2d1cd0bdf',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_mcgr1tWJ5',
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '5d3c2grqv6m77cmf4thdhk5uqp',
      },
      API: {
        graphql_endpoint: 'http://localhost:4445/admin_graphql',
      },
    },
  },
  dev: {
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:9c8c7b81-e599-4570-8b2b-b0a2d1cd0bdf',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_mcgr1tWJ5',
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '5d3c2grqv6m77cmf4thdhk5uqp',
      },
      API: {
        graphql_endpoint:
          'https://y3by4fytq4.execute-api.us-west-2.amazonaws.com/dev/admin_graphql/',
        graphql_endpoint_iam_region: 'us-west-2',
      },
    },
  },
  stag: {
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:7cea1850-8a40-47bd-97b3-68e14400235a',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_9VQ3DaZHq',
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '3795u7v5bmq0qve2lb6vnejuih',
      },
      API: {
        graphql_endpoint:
          'https://4k051usakf.execute-api.us-west-2.amazonaws.com/stag/admin_graphql/',
        graphql_endpoint_iam_region: 'us-west-2',
      },
    },
  },
  prod: {
    amplify: {
      Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:498b92a6-25db-4931-b887-50016a2ee951',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_MD7xmgEwZ',
        // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '2qb5728ogu1jq6ealanpfd8b8o',
      },
      API: {
        graphql_endpoint:
          'https://a474dwg0w4.execute-api.us-west-2.amazonaws.com/prod/admin_graphql/',
        graphql_endpoint_iam_region: 'us-west-2',
      },
    },
  },
};
