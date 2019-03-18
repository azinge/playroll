/**
 * SubScreenHeader
 */

import * as React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './SubScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  title: string;
  icons?: HeaderIcon[];
}

interface State {}

type HeaderIcon = {
  name: string;
  type?: string;
  onPress?: () => void;
  render?: () => JSX.Element;
};

export default class SubScreenHeader extends React.Component<Props, State> {
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
          placement='right'
          leftComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name='arrow-left'
                type='material-community'
                color='white'
                onPress={() => NavigationService.goBack()}
                containerStyle={{ marginTop: 5, marginRight: 4 }}
              />
              <Text style={styles.headerTitle}>{this.props.title}</Text>
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
    const menuIcon: HeaderIcon = {
      name: 'dots-vertical',
      type: 'material-community',
    };
    const searchIcon: HeaderIcon = {
      name: 'search',
      onPress: () => NavigationService.navigate('Search'),
    };
    const icons = this.props.icons || [menuIcon];
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
          containerStyle={{ marginTop: 5, marginLeft: 16 }}
          onPress={icon.onPress}
          key={icon.name}
        />
      )
    );
  }
}
