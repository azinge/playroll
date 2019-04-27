import { WebBrowser, Linking } from 'expo';
import { Platform } from 'react-native';

export const api = {
  local: {
    url: 'http://localhost:4445/graphql',
    region: '',
  },
  dev: {
    url: 'https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/graphql/',
    region: 'us-west-2',
  },
};

export const amplify = {
  dev: {
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:5428cbc4-d9c4-402d-bdfb-d0fe64ba8066',
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_u1L3OQa8W',
      // OPTIONAL - Amazon Cognito App Client ID
      userPoolWebClientId: '3gvfjnh67m86026e6g5vkaiegs',

      oauth: {
        domain: 'playroll-general.auth.us-west-2.amazoncognito.com',
        scope: ['public_profile', 'phone', 'email', 'profile', 'openid'],
        // redirectSignIn: 'https://app-dev.playroll.io',
        // redirectSignOut: 'https://app-dev.playroll.io',
        redirectSignIn: 'https://app.playroll.io',
        redirectSignOut: 'https://app.playroll.io',
        responseType: 'code', // or token
        urlOpener: WebBrowser.openBrowserAsync,
      },
    },
  },
};
