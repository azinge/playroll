/**
 * DiscoverScreen
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

import NavigationService from '../../../services/NavigationService';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';
import { musicSources } from '../../../static/mockData';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';

export interface Props {}

interface State {}

export default class DiscoverScreen extends React.Component<Props, State> {
  render() {
    return (
      <MainScreenContainer hideSearchIcon hideBottomBar disableBounce>
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
      </MainScreenContainer>
    );
  }
}
