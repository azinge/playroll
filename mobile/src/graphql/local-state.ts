import {
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  resendSignUp,
} from './resolvers/Auth';
import { coreData } from './resolvers/Core';
import gql from 'graphql-tag';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';

export const resolvers = {
  // Query: {
  //   local: () => {},
  // },
  // Mutation: {
  //   local: () => {},
  // },
  Query: {
    coreData,
  },
  Mutation: {
    signOut,
    signIn,
    signUp,
    confirmSignUp,
    resendSignUp,
  },
};

export const typeDefs = gql`
  # extend type Query {
  #   local: LocalQueryMethods
  # }
  # extend type Mutation {
  #   local: LocalMutationMethods
  # }

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
    resendSignUp(username: String): Boolean
  }

  type CoreData {
    isAuthenticated: Boolean
  }
`;

export const loadDefaults = (cache: ApolloCache<NormalizedCacheObject>) => {
  cache.writeData({
    data: {
      local: {
        __typename: 'LocalQueryMethods',
        coreData: {
          __typename: 'CoreData',
          isAuthenticated: false,
        },
      },
    },
  });
};
