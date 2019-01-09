import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import * as config from "../config/aws.js";
import { fetcher } from "../lib/apiutils/fetcher";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: config.api.dev.url,
    fetch: fetcher,
  }),
  cache: new InMemoryCache(),
});
