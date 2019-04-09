import { Auth } from 'aws-amplify';
import { GET_AUTHENTICATION_STATUS } from '../../requests/Auth/GetAuthenticationStatus';
export const signIn = async (_, { username, password }, { cache }) => {
  console.log('signing in...');
  return Auth.signIn(username, password)
    .then(response => {
      console.log('Auth.signIn promise resolved()', response);
      if (!response) return { error: null, data: null };
      console.log('signed in');

      cache.writeQuery({
        query: GET_AUTHENTICATION_STATUS,
        data: {
          coreData: { isAuthenticated: true, __typename: 'CoreData' },
        },
      });
      console.log(cache.readQuery({ query: GET_AUTHENTICATION_STATUS }));
      console.log('authenticated');
      return { data: response, error: null };
    })
    .catch(error => {
      console.log('Auth.signIn promise rejected()', error);
      return { error, data: null };
    });
};
