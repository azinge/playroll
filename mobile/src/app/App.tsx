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
import { LIST_CURRENT_USER_RECOMMENDATIONS_QUERY } from '../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import { LIST_FRIEND_REQUESTS_QUERY } from '../graphql/requests/Relationships/ListFriendRequestsQuery';
import { LIST_FRIENDS_QUERY } from '../graphql/requests/Relationships/ListFriendsQuery';
import { LIST_FRIENDS_PLAYROLLS_QUERY } from '../graphql/requests/Playroll/ListFriendsPlayrollsQuery';

export type Props = {};

type State = {};

export default class App extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    NotificationService.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _notificationSubscription = undefined;

  _handleNotification = notification => {
    if (notification.origin === 'received') {
      this.dropdown.alertWithType(
        'info',
        notification.data.Title,
        notification.data.Body
      );
      if (notification.data.Type === 'RECEIVED_RECOMMENDATION') {
        client.query({
          query: LIST_CURRENT_USER_RECOMMENDATIONS_QUERY,
          fetchPolicy: 'network-only',
        });
      }
      if (notification.data.Type === 'RECEIVED_FRIEND_REQUEST') {
        client.query({
          query: LIST_FRIEND_REQUESTS_QUERY,
          fetchPolicy: 'network-only',
        });
      }
      if (notification.data.Type === 'ACCEPTED_FRIEND_REQUEST') {
        client.query({
          query: LIST_FRIENDS_QUERY,
          fetchPolicy: 'network-only',
        });
        client.query({
          query: LIST_FRIENDS_PLAYROLLS_QUERY,
          fetchPolicy: 'network-only',
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <AppContainer
            navigationOptions={{ header: null, headerMode: 'screen' }}
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
