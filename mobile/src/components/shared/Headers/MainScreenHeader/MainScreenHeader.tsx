/**
 * MainScreenHeader
 */

import * as React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './MainScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
import { GetCurrentUserQuery } from '../../../../graphql/requests/User';

export interface Props {
  hideBottomBar?: boolean;
  hideSearchIcon?: boolean;
  icons?: HeaderIcon[];
}

interface State {}

type HeaderIcon = {
  name: string;
  type?: string;
  onPress?: () => void;
  render?: () => JSX.Element;
};

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
          leftComponent={
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name='play-circle'
                type='font-awesome'
                color='white'
                containerStyle={{ marginTop: 5, marginRight: 4 }}
              />
              <Text style={styles.headerTitle}>Playroll</Text>
            </View>
          }
          rightComponent={
            <View style={{ flexDirection: 'row' }}>{this.renderIcons()}</View>
          }
        />
      </View>
    );
  }

  renderIcons() {
    const extractUser = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return {};
      }
      return data.private.currentUser;
    };
    const profileIcon: HeaderIcon = {
      name: 'profile',
      render: () => (
        <GetCurrentUserQuery key='user'>
          {({ loading, error, data }) => {
            const user = extractUser(data);
            return (
              <TouchableHighlight
                onPress={() => NavigationService.navigate('Account')}
                style={styles.profileAvatarContainer}
                key='profile'
              >
                {
                  <Image
                    style={styles.profileAvatar}
                    source={{ uri: user.avatar }}
                  />
                }
              </TouchableHighlight>
            );
          }}
        </GetCurrentUserQuery>
      ),
    };
    const searchIcon: HeaderIcon = {
      name: 'search',
      onPress: () => NavigationService.navigate('Search'),
    };
    const icons =
      this.props.icons || this.props.hideSearchIcon
        ? [profileIcon]
        : [searchIcon, profileIcon];
    return icons.map(icon =>
      icon.render ? (
        icon.render()
      ) : (
        <Icon
          name={icon.name}
          type={icon.type}
          size={27}
          color='white'
          underlayColor='rgba(255,255,255,0)'
          containerStyle={{ marginTop: 2, marginLeft: 16 }}
          onPress={icon.onPress}
          key={icon.name}
        />
      )
    );
  }
}
