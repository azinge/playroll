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
import NavigationService from '../../../services/NavigationService';
import MainScreenHeader from '../../shared/Headers/MainScreenHeader';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class YourLibraryScreen extends React.Component<Props, State> {
  render() {
    return (
      <Collapsible
        max={45}
        min={isIphoneX() ? 41 : 19}
        backgroundColor={'purple'}
        renderHeader={this.renderHeader()}
        // renderContent is not needed if using FlatList
        renderContent={this.renderContent()}

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
    );
  }

  renderHeader() {
    return <MainScreenHeader />;
  }

  renderContent() {
    return (
      <View style={{ marginTop: 5, flex: 1 }}>
        <View style={styles.textContainer}>
          <Text
            onPress={() => {
              NavigationService.navigate('BrowsePlayrolls');
            }}
            style={styles.playrollsText}
          >
            Your Playrolls
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.text}>
            Your Discovery Queue
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.text}>
            Your Recommendations
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.text}>
            Made For You
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.text}>
            Saved Playrolls
          </Text>
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text onPress={() => {}} style={styles.title}>
            Recently Viewed
          </Text>
        </View>
        <ScrollView
          style={{ marginLeft: 15, marginVertical: 10, paddingBottom: 10 }}
        >
          {musicSources.map((val, idx) => {
            return (
              <TouchableOpacity onPress={() => {}} key={idx}>
                <View
                  style={{
                    flex: 1,
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
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 90,
                    }}
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
