/**
 * DiscoverScreen
 */

import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import DiscoverCarousel from './DiscoverCarousel';

import { musicSources } from '../../../static/mockData';
import { Header, Icon } from 'react-native-elements';

import { Font } from 'expo';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

Font.loadAsync({
  Avenir: require('../../../assets/fonts/AvenirLTStd-Black.otf'),
});

interface State {}
export default class DiscoverScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          backgroundColor='purple'
          centerComponent={{
            text: 'Discover',
            style: { color: '#fff', fontSize: 20 },
          }}
          rightComponent={
            <Icon
              name='account-circle'
              color='white'
              underlayColor='purple'
              onPress={() =>
                this.props.navigation &&
                this.props.navigation.navigate('Profile')
              }
            />
          }
        />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#993399',
              }}
            >
              Home
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: 'grey',
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'grey',
              }}
            >
              Playrolls
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: 'grey',
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'grey',
              }}
            >
              Radio
            </Text>
          </View>
        </View>
        <DiscoverCarousel />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#993399',
              }}
            >
              Popular
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: 'grey',
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'grey',
              }}
            >
              New
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: 'grey',
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'grey',
              }}
            >
              Recommended
            </Text>
          </View>
        </View>
        <ScrollView horizontal={true}>
          {musicSources.map((val, idx) => {
            return (
              <View style={{ width: 125, marginHorizontal: 10 }} key={idx}>
                <Image
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                  }}
                  source={{ uri: val.cover }}
                />
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: 'bold',
                    fontSize: 10,
                    color: 'grey',
                  }}
                  numberOfLines={2}
                >
                  {val.name}
                </Text>
                {val.creator && (
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: 'bold',
                      fontSize: 10,
                      color: 'lightgrey',
                    }}
                    numberOfLines={2}
                  >
                    {val.creator}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
