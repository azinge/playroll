/**
 * LoadingScreen
 */

import * as React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';

import styles from './LoadingScreen.styles';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import NavigationService from '../../../services/NavigationService';
import NotificationService from '../../../services/NotificationService';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  deviceToken: string;
}
export default class LoadingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      deviceToken: undefined,
    };
  }
  async componentDidMount() {
    const deviceToken = await NotificationService.registerForPushNotificationsAsync();
    this.setState({ deviceToken });
  }
  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <GetCurrentUserQuery
          skip={this.state.deviceToken === undefined}
          variables={{
            deviceToken: this.state.deviceToken
              ? this.state.deviceToken
              : undefined,
          }}
        >
          {({ loading, error }) => {
            if (!loading && this.state.deviceToken !== undefined) {
              setTimeout(() => {
                NavigationService.dispatch(
                  StackActions.reset({
                    key: null,
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: error ? 'Auth' : 'Main',
                      }),
                    ],
                  })
                );
              }, 1250);
            }
            return null;
          }}
        </GetCurrentUserQuery>
        <ImageBackground
          source={require('../../../assets/loading.png')}
          resizeMode='cover'
          style={{ height: height, width: width }}
        />
      </View>
    );
  }
}
