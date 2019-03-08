/**
 * DiscoverScreen
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
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
          placement='left'
          leftComponent={
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon
              //   raised
              name='play-circle'
              type='font-awesome'
              color='white'
              onPress={() => console.log('hello')}
              containerStyle={{ marginTop: 5, marginRight: 5 }}
            /> */}
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 5,
                  marginRight: 5,
                  borderRadius: 5,
                }}
                source={require('../../../assets/new_playroll.png')}
              />
              <Text
                style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}
              >
                Playroll
              </Text>
            </View>
          }
          rightComponent={
            <TouchableHighlight
              onPress={() =>
                this.props.navigation &&
                this.props.navigation.navigate('Profile')
              }
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                overflow: 'hidden',
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  overflow: 'hidden',
                }}
                source={require('../../../assets/wack.jpg')}
              />
            </TouchableHighlight>
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
