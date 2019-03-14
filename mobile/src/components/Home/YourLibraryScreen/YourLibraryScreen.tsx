/**
 * YourLibraryScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';
import { Header, Icon } from 'react-native-elements';
import { musicSources } from '../../../static/mockData';

import Collapsible from 'react-native-collapsible-header';
import styles from './YourLibraryScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class YourLibraryScreen extends React.Component<Props, State> {
  render() {
    return (
      <Collapsible
        max={45}
        min={isIphoneX() ? 45 : 20}
        backgroundColor={'purple'}
        renderHeader={this.renderHeader()}
        // renderContent is not needed if using FlatList
        renderContent={
          <View style={{ marginTop: 5, flex: 1 }}>
            <View style={styles.textContainer}>
              <Text
                onPress={() => {
                  this.props.navigation &&
                    this.props.navigation.navigate('Playrolls');
                }}
                style={styles.text}
              >
                Playrolls
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text onPress={() => {}} style={styles.disabledText}>
                Made For You
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text onPress={() => {}} style={styles.disabledText}>
                Saved Tracklists
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text onPress={() => {}} style={styles.disabledText}>
                Saved Rolls
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text onPress={() => {}} style={styles.disabledText}>
                Your Recommendations
              </Text>
            </View>
            <View style={{ marginLeft: 15, marginTop: 10 }}>
              <Text onPress={() => {}} style={styles.text}>
                Recently Viewed
              </Text>
            </View>
            <ScrollView
              style={{ marginLeft: 15, marginVertical: 10, paddingBottom: 10 }}
            >
              {musicSources.map((val, idx) => {
                return (
                  <View
                    style={{
                      //   width: 300,
                      flex: 1,
                      //   marginHorizontal: 10,
                      marginVertical: 5,
                      flexDirection: 'row',
                    }}
                    key={idx}
                  >
                    <View
                      style={{
                        borderColor: 'white',
                        shadowColor: 'gray',
                        shadowOffset: {
                          width: 2,
                          height: 3,
                        },
                        shadowRadius: 3,
                        shadowOpacity: 0.2,
                      }}
                    >
                      <Image style={styles.image} source={{ uri: val.cover }} />
                    </View>

                    <View
                      style={{ marginTop: 5, marginLeft: 10, marginRight: 90 }}
                    >
                      <Text style={styles.sourceTitle} numberOfLines={1}>
                        {val.name}
                      </Text>
                      {val.creator && (
                        <Text style={styles.sourceCreator} numberOfLines={1}>
                          {val.creator}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* <View style={{ marginVertical: -10 }} /> */}
          </View>
        }

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
    );
  }
  renderHeader() {
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
              marginTop: -20,
            }
          ),
        }}
      >
        <Header
          backgroundColor='purple'
          placement='right'
          //   statusBarProps={{ translucent: false }}
          leftComponent={
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name='play-circle'
                type='font-awesome'
                color='white'
                onPress={() => console.log('hello')}
                containerStyle={{ marginTop: 5, marginRight: 4 }}
              />
              <Text style={styles.headerTitle}>Playroll</Text>
            </View>
          }
          centerComponent={
            <Icon
              name='search'
              size={27}
              color='white'
              containerStyle={{ marginTop: 5, marginLeft: 5 }}
              onPress={() =>
                this.props.navigation &&
                this.props.navigation.navigate('Search')
              }
            />
          }
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation &&
                  this.props.navigation.navigate('Profile')
                }
                style={styles.profileAvatar}
              >
                <Image
                  style={styles.profileAvatar}
                  source={require('../../../assets/wack.jpg')}
                />
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}
