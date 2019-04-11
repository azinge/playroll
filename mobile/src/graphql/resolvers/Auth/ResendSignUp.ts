import { Auth } from 'aws-amplify';

export const resendSignUp = async (_, { username }) => {
  try {
    const resendSignUpData = await Auth.resendSignUp(username);
    return resendSignUpData;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
