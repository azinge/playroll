/**
 * SubScreenHeader
 */

import * as React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './SubScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
import Icons, { HeaderIconType } from '../../../../themes/Icons';

export interface Props {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
}

interface State {}

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
                name={this.props.modal ? 'close' : 'arrow-left'}
                type='material-community'
                color='white'
                underlayColor='rgba(255,255,255,0)'
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
    const icons = this.props.icons || [];
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
