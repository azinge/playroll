import { Auth } from "aws-amplify";

export const signIn = async (username: string, password: string) => {
  try {
    await Auth.signIn(username, password);
    console.log("signed in");
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
