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
} from 'react-native';
import { LinearGradient } from 'expo';

import { NavigationScreenProp } from 'react-navigation';
import { MusicSource } from '../../../graphql/types';
import { Button } from 'react-native-elements';

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
          colors={['#9333CC', 'white']}
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
          <View style={{ marginTop: 25, marginLeft: 50, marginRight: 50 }}>
            <Button
              title='Add To Playroll'
              containerStyle={{ margin: 10 }}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 25,
                height: 50,
              }}
              titleStyle={{ color: 'purple', fontSize: 16 }}
              onPress={() => {}}
              raised
            />
            <Button
              title='Add To Discovery Queue'
              containerStyle={{ margin: 10 }}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 25,
                height: 50,
              }}
              titleStyle={{ color: 'purple', fontSize: 16 }}
              onPress={() => {}}
              raised
            />
            <Button
              title='Recommend'
              containerStyle={{ margin: 10 }}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 25,
                height: 50,
              }}
              titleStyle={{ color: 'purple', fontSize: 16 }}
              onPress={() => {}}
              raised
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
