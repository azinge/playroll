/**
 * UserCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './UserCard.styles';
import { Icon } from 'react-native-elements';
import { User } from '../../../../graphql/types';
import Icons, { HeaderIconType } from '../../../../themes/Icons';

export interface Props {
  user: User;
  onPress?: (user: User) => void;
  icons?: HeaderIconType[];
}

interface State {}

export default class UserCard extends React.Component<Props, State> {
  render() {
    const {
      user,
      onPress = () => {},
      icons = [{ ...Icons.menuIcon }],
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => onPress(user)}
        disabled={!this.props.onPress}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Image
              style={styles.cover}
              source={{
                uri: user.avatar,
              }}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              {/* Dummy Info */}
              <Text style={styles.artist} numberOfLines={2}>
                {user.name}
              </Text>
              {/* Dummy Info
                <Text style={styles.subInfo} numberOfLines={2}>
                  6 Followers
                </Text> */}
            </View>
            {icons.map(icon => {
              return (
                <View style={{ marginRight: 10 }}>
                  {icon.render ? (
                    icon.render()
                  ) : (
                    <Icon
                      size={35}
                      name={icon.name}
                      color='lightgrey'
                      underlayColor='rgba(255,255,255,0)'
                      onPress={icon.onPress}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
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
          color='purple'
          underlayColor='rgba(255,255,255,0)'
          containerStyle={{ marginTop: 5, marginLeft: 16 }}
          onPress={icon.onPress}
          key={icon.name}
        />
      )
    );
  }
}
