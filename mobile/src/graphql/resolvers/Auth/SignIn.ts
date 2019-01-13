import { Auth } from "aws-amplify";

export const signIn = async (_, { username, password }) => {
  try {
    console.log("signing in");
    await Auth.signIn(username, password);
    console.log("signed in");
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
