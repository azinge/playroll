import { signIn, signOut, signUp, confirmSignUp } from './resolvers/Auth';

export const resolvers = {
  Mutation: {
    signOut,
    signIn,
    signUp,
    confirmSignUp,
  },
};
