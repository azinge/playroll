import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../graphql/client';
import { AppContainer } from '../components/router';
import { NavigationContainerComponent } from 'react-navigation';
import NavigationService from '../services/NavigationService';
import NotificationService from '../services/NotificationService';
import { Notifications } from 'expo';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

export type Props = {};

type State = {};

export default class App extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    NotificationService.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _notificationSubscription = undefined;

  _handleNotification = notification => {
    NotificationService.handleNotification(notification, this.dropdown, client);
  }

  render() {
    return (
      // https://reactnavigation.org/docs/en/common-mistakes.html#wrapping-appcontainer-in-a-view-without-flex
      <View style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <AppContainer // https://reactnavigation.org/docs/en/app-containers.html

            // https://stackoverflow.com/questions/44701245/hide-header-in-stack-navigator-react-navigation/44701408#44701408
            navigationOptions={{ header: null, headerMode: 'screen' }}

            // https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
            ref={navigatorRef => {
              navigatorRef = navigatorRef as NavigationContainerComponent;
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </ApolloProvider>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
