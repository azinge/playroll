import { Auth } from 'aws-amplify';

export const signUp = async (_, { username, password, email, avatar }) => {
  try {
    const signUpData = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        profile: avatar,
      },
    });
    return { data: { signUp: signUpData } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
