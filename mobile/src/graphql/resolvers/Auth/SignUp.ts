import { Auth } from "aws-amplify";

export const signUp = async (_, { username, password, email }) => {
  try {
    console.log("signing up");
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      validationData: [], //optional
    });
    console.log("signed up");
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
