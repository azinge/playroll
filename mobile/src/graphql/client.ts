import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import * as config from "../config/aws.js";
import { fetcher } from "../lib/apiutils/fetcher";
import { withClientState } from "apollo-link-state";
import { resolvers } from "./resolvers";

// This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
});

const httpLink = new HttpLink({
  uri: config.api.dev.url,
  fetch: fetcher,
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink]),
});
