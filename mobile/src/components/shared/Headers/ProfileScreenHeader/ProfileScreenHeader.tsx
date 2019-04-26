/**
 * ProfileScreenHeader
 */

import * as React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './ProfileScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
import Icons, { HeaderIconType } from '../../../../themes/Icons';

export interface Props {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
  local?: boolean;
}

interface State {}

export default class ProfileScreenHeader extends React.Component<Props, State> {
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
          backgroundColor='white'
          placement='right'
          backgroundImage={require('../../../../../assets/playroll_square_background.png')}
          containerStyle={{ borderBottomWidth: 0, height: 300 }}
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
          // rightComponent={
          //   <View style={{ flexDirection: 'row' }}>
          //     {this.props.local && (
          //       <Icon
          //         name='pencil'
          //         type='material-community'
          //         color='white'
          //         underlayColor='rgba(255,255,255,0)'
          //         // onPress={() => }
          //         containerStyle={{ marginTop: 5, marginRight: 4 }}
          //       />
          //     )}
          //   </View>
          // }
        />
      </View>
    );
  }
}
