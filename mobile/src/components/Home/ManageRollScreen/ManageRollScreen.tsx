/**
 * ManageRollScreen
 */

import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { MusicSource } from 'graphql/types';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class ManageRollScreen extends React.Component<Props, State> {
  render() {
    const currentSource =
      this.props.navigation && this.props.navigation.getParam('currentSource');
    // console.log(currentSource.cover);
    return (
      <View style={{ flex: 2, backgroundColor: 'white' }}>
        <LinearGradient
          colors={['white', '#9333CC']}
          style={{
            flex: 2,
          }}
        >
          <View
            style={{
              shadowColor: 'black',
              shadowOffset: { height: 2, width: 2 },
              shadowOpacity: 0.3,
            }}
          >
            <ImageBackground
              source={{
                uri: currentSource.cover,
              }}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                justifyContent: 'center',
                resizeMode: 'center',
                marginTop: 40,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
              {currentSource.name}
            </Text>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              {currentSource.type}
            </Text>
          </View>
          <View style={{ margin: 25 }}>
            <Button
              fontWeight='bold'
              title='Add To Playroll'
              color='#9333CC'
              buttonStyle={{
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 5,
              }}
              onPress={() => {}}
              raised
            />
            <Button
              title='Add To Discovery Queue'
              color='#9333CC'
              buttonStyle={{
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 5,
              }}
              onPress={() => {}}
              raised
            />
            <Button
              title='Recommend to Friend'
              color='#9333CC'
              buttonStyle={{
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 5,
              }}
              onPress={() => {}}
              raised
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
