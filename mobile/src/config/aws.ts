import { WebBrowser, Linking } from 'expo';
import { Platform } from 'react-native';

export const api = {
  local: {
    url: 'http://localhost:4445/graphql',
    region: '',
  },
  dev: {
    url: 'https://y3by4fytq4.execute-api.us-west-2.amazonaws.com/dev/graphql/',
    region: 'us-west-2',
  },
  stag: {
    url: 'https://4k051usakf.execute-api.us-west-2.amazonaws.com/stag/graphql/',
    region: 'us-west-2',
  },
  prod: {
    url: 'https://a474dwg0w4.execute-api.us-west-2.amazonaws.com/prod/graphql/',
    region: 'us-west-2',
  },
};

export const amplify = {
  local: {
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:9c8c7b81-e599-4570-8b2b-b0a2d1cd0bdf',
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_mcgr1tWJ5',
      // OPTIONAL - Amazon Cognito App Client ID
      userPoolWebClientId: '5d3c2grqv6m77cmf4thdhk5uqp',

      oauth: {
        domain: 'playroll-dev.auth.us-west-2.amazoncognito.com',
        scope: ['public_profile', 'phone', 'email', 'profile', 'openid'],
        redirectSignIn: 'https://app-dev.playroll.io',
        redirectSignOut: 'https://app-dev.playroll.io',
        responseType: 'code', // or token
        urlOpener: WebBrowser.openBrowserAsync,
      },
    },
  },
  dev: {
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:9c8c7b81-e599-4570-8b2b-b0a2d1cd0bdf',
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_mcgr1tWJ5',
      // OPTIONAL - Amazon Cognito App Client ID
      userPoolWebClientId: '5d3c2grqv6m77cmf4thdhk5uqp',

      oauth: {
        domain: 'playroll-dev.auth.us-west-2.amazoncognito.com',
        scope: ['public_profile', 'phone', 'email', 'profile', 'openid'],
        redirectSignIn: 'https://app.playroll.io',
        redirectSignOut: 'https://app.playroll.io',
        responseType: 'code', // or token
        urlOpener: WebBrowser.openBrowserAsync,
      },
    },
  },
  stag: {
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:7cea1850-8a40-47bd-97b3-68e14400235a',
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_9VQ3DaZHq',
      // OPTIONAL - Amazon Cognito App Client ID
      userPoolWebClientId: '3795u7v5bmq0qve2lb6vnejuih',

      oauth: {
        domain: 'playroll-stag.auth.us-west-2.amazoncognito.com',
        scope: ['public_profile', 'phone', 'email', 'profile', 'openid'],
        redirectSignIn: 'https://app.playroll.io',
        redirectSignOut: 'https://app.playroll.io',
        responseType: 'code', // or token
        urlOpener: WebBrowser.openBrowserAsync,
      },
    },
  },
  prod: {
    Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-west-2:498b92a6-25db-4931-b887-50016a2ee951',
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_MD7xmgEwZ',
      // OPTIONAL - Amazon Cognito App Client ID
      userPoolWebClientId: '2qb5728ogu1jq6ealanpfd8b8o',

      oauth: {
        domain: 'playroll-prod.auth.us-west-2.amazoncognito.com',
        scope: ['public_profile', 'phone', 'email', 'profile', 'openid'],
        redirectSignIn: 'https://app.playroll.io',
        redirectSignOut: 'https://app.playroll.io',
        responseType: 'code', // or token
        urlOpener: WebBrowser.openBrowserAsync,
      },
    },
  },
};
