/**
 * HomeScreen
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import DiscoverCarousel from './DiscoverCarousel';

import { musicSources } from '../../../static/mockData';
import { Header, Icon } from 'react-native-elements';
import styles from './HomeScreen.styles';
import { Font } from 'expo';
import Collapsible from 'react-native-collapsible-header';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class HomeScreen extends React.Component<Props, State> {
  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  }
  render() {
    return (
      //   <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Collapsible
        backgroundColor={'purple'}
        renderHeader={this.renderHeader()}
        // renderContent is not needed if using FlatList
        renderContent={
          <View style={{ marginTop: 5, flex: 1 }}>
            <View
              style={{
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.title}>Suggested Playrolls</Text>
            </View>

            <DiscoverCarousel />

            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              <Text style={styles.title}>Discovery Queue</Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {musicSources.map((val, idx) => {
                return (
                  <View style={{ width: 125, marginHorizontal: 10 }} key={idx}>
                    <Image style={styles.image} source={{ uri: val.cover }} />
                    <Text style={styles.sourceTitle} numberOfLines={2}>
                      {val.name}
                    </Text>
                    {val.creator && (
                      <Text style={styles.sourceCreator} numberOfLines={1}>
                        {val.creator}
                      </Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              <Text style={styles.title}> Recommendations</Text>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {musicSources.map((val, idx) => {
                return (
                  <View style={{ width: 125, marginHorizontal: 10 }} key={idx}>
                    <Image style={styles.image} source={{ uri: val.cover }} />
                    <Text style={styles.sourceTitle} numberOfLines={2}>
                      {val.name}
                    </Text>
                    {val.creator && (
                      <Text style={styles.sourceCreator} numberOfLines={1}>
                        {val.creator}
                      </Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>
            <View style={{ marginVertical: 10 }} />
          </View>
        }

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
      //   </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Header
          backgroundColor='purple'
          placement='right'
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
