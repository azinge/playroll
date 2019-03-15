/**
 * MainScreenHeader
 */

import * as React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './MainScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  hideBottomBar?: boolean;
  hideSearchIcon?: boolean;
}

interface State {}

export default class MainScreenHeader extends React.Component<Props, State> {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          ...ifIphoneX(
            {
              marginTop: -40,
            },
            {
              marginTop: -19,
            }
          ),
        }}
      >
        <Header
          backgroundColor='purple'
          containerStyle={this.props.hideBottomBar && { borderBottomWidth: 0 }}
          placement='right'
          //   statusBarProps={{ translucent: false }}
          leftComponent={
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name='play-circle'
                type='font-awesome'
                color='white'
                onPress={() => console.log('hello')}
                containerStyle={{ marginTop: 5, marginRight: 4 }}
              />
              <Text style={styles.headerTitle}>Playroll</Text>
            </View>
          }
          centerComponent={
            !this.props.hideSearchIcon && (
              <Icon
                name='search'
                size={27}
                color='white'
                underlayColor='rgba(255,255,255,0)'
                containerStyle={{ marginTop: 5, marginLeft: 5 }}
                onPress={() => NavigationService.navigate('Search')}
              />
            )
          }
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                onPress={() => NavigationService.navigate('Profile')}
                style={styles.profileAvatar}
              >
                <Image
                  style={styles.profileAvatar}
                  source={require('../../../../assets/wack.jpg')}
                />
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}
