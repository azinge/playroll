/**
 * SearchScreenHeader
 */

import * as React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ViewStyle,
  StyleProp,
  TextInput,
} from 'react-native';

import styles from './SearchScreenHeader.styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
import { HeaderIconType } from '../../../../themes/Icons';

export interface Props {
  icons?: HeaderIconType[];
  title?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
}

interface State {
  text: string;
}

export default class SearchScreenHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: '' };
  }
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
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              <Icon
                name='arrow-left'
                type='material-community'
                color='white'
                underlayColor='rgba(255,255,255,0)'
                onPress={() => NavigationService.goBack()}
                containerStyle={{ marginTop: 5, marginRight: 4 }}
              />
            </View>
          }
          centerComponent={
            <View
              style={{
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#4F0C50',
                borderRadius: 5,
                paddingHorizontal: 5,
                width: 275,
              }}
            >
              <TextInput
                style={[
                  styles.headerTitle,
                  { flex: 2, color: 'white', fontSize: 18 },
                ]}
                value={this.state.text}
                onChangeText={text => {
                  this.setState({ text });
                  if (this.props.onChangeText) {
                    this.props.onChangeText(text);
                  }
                }}
                onSubmitEditing={e => {
                  if (this.props.onSubmitEditing) {
                    this.props.onSubmitEditing(this.state.text);
                  }
                }}
                placeholderTextColor={'grey'}
                placeholder={this.props.title}
              />
              <Icon
                name={'close'}
                type={'material-community'}
                size={25}
                color='white'
                underlayColor='rgba(255,255,255,0)'
                containerStyle={{ top: 1 }}
                onPress={() => {
                  this.setState({ text: '' });
                }}
              />
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
    const menuIcon: HeaderIconType = {
      name: 'dots-vertical',
      type: 'material-community',
      style: { marginRight: 0 },
    };
    const searchIcon: HeaderIconType = {
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
          containerStyle={[{ marginTop: 5, marginRight: 16 }, icon.style]}
          onPress={icon.onPress}
          key={icon.name}
        />
      )
    );
  }
}
