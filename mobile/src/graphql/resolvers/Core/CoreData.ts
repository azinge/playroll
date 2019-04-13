import { GET_AUTHENTICATION_STATUS } from '../../requests/Auth/GetAuthenticationStatus';

export const coreData = async (_1, _2, { cache }) => {
  try {
    return cache.readQuery({ query: GET_AUTHENTICATION_STATUS });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
