import { signIn, signOut, signUp, confirmSignUp } from './resolvers/Auth';
import gql from 'graphql-tag';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';

export const resolvers = {
  Mutation: {
    signOut,
    signIn,
    signUp,
    confirmSignUp,
  },
};

export const typeDefs = gql`
  extend type Query {
    coreData: CoreData
  }

  extend type Mutation {
    signOut: Boolean
    signIn(username: String, password: String): Boolean
    signUp(
      username: String
      password: String
      email: String
      avatar: String
    ): Boolean
    confirmSignUp(username: String, code: String): Boolean
  }

  type CoreData {
    isAuthenticated: Boolean
  }
`;

export const loadDefaults = (cache: ApolloCache<NormalizedCacheObject>) => {
  cache.writeData({
    data: {
      coreData: {
        isAuthenticated: false,
        __typename: 'CoreData',
      },
    },
  });
};
