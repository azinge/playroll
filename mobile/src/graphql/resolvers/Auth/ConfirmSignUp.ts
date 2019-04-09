import { Auth } from 'aws-amplify';

export const confirmSignUp = async (_, { username, code }) => {
  console.log('confirming...');
  return Auth.confirmSignUp(username, code, { forceAliasCreation: true });
};
