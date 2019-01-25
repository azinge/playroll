import { Auth } from "aws-amplify";
import { GET_AUTHENTICATION_STATUS } from "../../requests/Auth/GetAuthenticationStatus";
export const signIn = async (_, { username, password }, { cache }) => {
  try {
    console.log("signing in");
    await Auth.signIn(username, password);
    console.log("signed in");

    cache.writeQuery({
      query: GET_AUTHENTICATION_STATUS,
      data: {
        coreData: { isAuthenticated: true, __typename: "CoreData" },
      },
    });
    console.log(cache.readQuery({ query: GET_AUTHENTICATION_STATUS }));
    console.log("authenticated");
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
