import { Auth } from 'aws-amplify';
import { GET_AUTHENTICATION_STATUS } from '../../requests/Auth/GetAuthenticationStatus';
export const signIn = async (_, { username, password }, { cache }) => {
  try {
    const signInData = await Auth.signIn(username, password);
    // cache.writeQuery({
    //   query: GET_AUTHENTICATION_STATUS,
    //   data: {
    //     coreData: { isAuthenticated: true, __typename: 'CoreData' },
    //   },
    // });
    return signInData;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
