import { Auth } from 'aws-amplify';

export const signUp = async (_, { username, password, email, avatar }: any) => {
  console.log('signing up');
  console.log(avatar);
  return Auth.signUp({
    username,
    password,
    attributes: {
      email, // optional
      profile: avatar, // optional
    },
    validationData: [], // optional
  });
};
