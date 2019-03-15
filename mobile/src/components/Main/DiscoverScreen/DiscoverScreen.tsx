/**
 * DiscoverScreen
 */

import React from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Collapsible from 'react-native-collapsible-header';

import MainScreenHeader from '../../shared/Headers/MainScreenHeader';
import NavigationService from '../../../services/NavigationService';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';
import { musicSources } from '../../../static/mockData';

export interface Props {}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Collapsible
          max={45}
          min={isIphoneX() ? 41 : 19}
          backgroundColor={'purple'}
          renderHeader={this.renderHeader()}
          renderContent={this.renderContent()}
          bounces={false}
        />
      </View>
    );
  }

  renderHeader() {
    return <MainScreenHeader hideSearchIcon hideBottomBar />;
  }

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['purple', 'white']}
          style={{ height: 200, alignItems: 'center', flex: 1 }}
        >
          <Text
            style={{
              marginTop: 40,
              marginBottom: 20,
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Discover
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              width: 300,
              padding: 5,
              borderRadius: 10,
              alignItems: 'flex-start',
            }}
            onPress={() => NavigationService.navigate('Search')}
          >
            <Icon
              name='search'
              color='white'
              containerStyle={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </LinearGradient>

        <HorizontalMusicSourceList
          title={'Suggested Playrolls'}
          musicSources={musicSources}
        />

        <HorizontalMusicSourceList
          title={'Suggested Rolls'}
          musicSources={musicSources}
        />

        <HorizontalMusicSourceList
          title={'Popular Playrolls'}
          musicSources={musicSources}
        />

        <HorizontalMusicSourceList
          title={'New Releases'}
          musicSources={musicSources}
        />
      </View>
    );
  }
}
