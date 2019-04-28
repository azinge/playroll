import { Permissions, Notifications } from 'expo';

import { LIST_CURRENT_USER_RECOMMENDATIONS_QUERY } from '../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import { LIST_FRIEND_REQUESTS_QUERY } from '../graphql/requests/Relationships/ListFriendRequestsQuery';
import { LIST_FRIENDS_QUERY } from '../graphql/requests/Relationships/ListFriendsQuery';
import { LIST_FRIENDS_PLAYROLLS_QUERY } from '../graphql/requests/Playroll/ListFriendsPlayrollsQuery';
import { LIST_EXCHANGED_RECOMMENDATIONS_QUERY } from '../graphql/requests/Recommendation/ListExchangedRecommendationsQuery';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return null;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  return token;
}

function handleNotification(notification, dropdown, client) {
  if (notification.origin === 'received') {
    dropdown.alertWithType(
      'info',
      notification.data.Title,
      notification.data.Body
    );
    if (notification.data.Type === 'RECEIVED_RECOMMENDATION') {
      client.query({
        query: LIST_EXCHANGED_RECOMMENDATIONS_QUERY,
        fetchPolicy: 'network-only',
      });
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

export default { registerForPushNotificationsAsync, handleNotification };
