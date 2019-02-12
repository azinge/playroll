import { Auth } from 'aws-amplify';

export const confirmSignUp = async (_, { username, code }) => {
  try {
    console.log('confirming...');
    await Auth.confirmSignUp(username, code, { forceAliasCreation: true });
    console.log('confirmed!');
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
