/**
 * SearchScreen
 */

import React from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import Search from '../../shared/Search/Search';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

export default class SearchScreen extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor='purple'
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{
            text: 'Search',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <View style={{ flex: 1 }}>
          <Search navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
