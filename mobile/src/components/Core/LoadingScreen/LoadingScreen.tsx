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
