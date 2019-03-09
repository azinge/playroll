import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../graphql/client';
import { AppContainer } from '../components/router';
import { NavigationContainerComponent } from 'react-navigation';
import NavigationService from '../services/NavigationService';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer
          navigationOptions={{ header: null, headerMode: 'screen' }}
          ref={navigatorRef => {
            navigatorRef = navigatorRef as NavigationContainerComponent;
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ApolloProvider>
    );
  }
}
