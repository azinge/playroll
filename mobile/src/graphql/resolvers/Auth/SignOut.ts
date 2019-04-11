import { Auth } from 'aws-amplify';
export const signOut = async (_1, _2, { cache }) => {
  try {
    const signOutData = await Auth.signOut();
    cache.reset();
    return signOutData;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
