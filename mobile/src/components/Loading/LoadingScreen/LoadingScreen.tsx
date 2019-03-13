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

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class LoadingScreen extends React.Component<Props, State> {
  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <GetCurrentUserQuery>
        {({ loading, error }) => {
          if (!loading) {
            setTimeout(() => {
              this.props.navigation &&
                this.props.navigation.dispatch(
                  StackActions.reset({
                    key: null,
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: error ? 'Profile' : 'Home',
                      }),
                    ],
                  })
                );
            }, 1250);
          }
          return (
            <View style={styles.container}>
              <ImageBackground
                source={require('../../../assets/loading.png')}
                resizeMode='cover'
                style={{ height: height, width: width }}
              />
            </View>
          );
        }}
      </GetCurrentUserQuery>
    );
  }
}
