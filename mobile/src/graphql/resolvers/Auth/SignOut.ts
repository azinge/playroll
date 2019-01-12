import { Auth } from "aws-amplify";

export const signOut = async () => {
  try {
    await Auth.signOut();
    console.log("signed out");
    return null;
  } catch (e) {
    throw e;
  }
};
