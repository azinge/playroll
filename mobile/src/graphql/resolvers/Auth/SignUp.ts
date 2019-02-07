import { Auth } from "aws-amplify";

export const signUp = async (
  {},
  { username, password, email, avatar }: any
) => {
  try {
    console.log("signing up");
    console.log(avatar);
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        profile: avatar, // optional
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
