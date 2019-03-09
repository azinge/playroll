import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// @ts-ignore
import apolloLogger from 'apollo-link-logger';
import * as config from '../config/aws';
import APIService from '../services/APIService';
import { withClientState } from 'apollo-link-state';
import { resolvers } from './resolvers';
import { defaults } from './defaults';

// This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      playroll: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Playroll', id: args.id }),
    },
  },
});

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const httpLink = new HttpLink({
  uri: config.api.dev.url,
  fetch: APIService.fetch,
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([apolloLogger, stateLink, httpLink]),
});
