import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { client } from '../graphql/client';
import { AppContainer } from '../components/router';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
