import gql from "graphql-tag";
import { signIn, signOut } from "./resolvers/Auth";

export const resolvers = {
  Mutation: {
    signOut,
    signIn,
  },
};
