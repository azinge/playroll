import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// @ts-ignore
import apolloLogger from 'apollo-link-logger';
import * as config from '../config/aws';
import APIService from '../services/APIService';
import { withClientState } from 'apollo-link-state';
import { resolvers, typeDefs, loadDefaults } from './local-state';

// This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache({
  cacheRedirects: {
    PrivateQueryMethods: {
      currentUserPlayroll: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Playroll', id: args.id });
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: config.api.dev.url,
  fetch: APIService.fetch,
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([apolloLogger, httpLink]),
  resolvers,
  typeDefs,
});

loadDefaults(client.cache);
