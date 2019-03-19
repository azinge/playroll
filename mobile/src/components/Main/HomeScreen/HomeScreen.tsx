/**
 * HomeScreen
 */

import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import HomeCarousel from './HomeCarousel';
import { musicSources } from '../../../static/mockData';
import styles from './HomeScreen.styles';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  render() {
    return (
      <MainScreenContainer>
        <View style={{ marginTop: 5, flex: 1 }}>
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.title}>Suggested Playrolls</Text>
          </View>

          <HomeCarousel />

          <HorizontalMusicSourceList
            title={'Discovery Queue'}
            musicSources={musicSources}
          />

          <HorizontalMusicSourceList
            title={'Recommendations'}
            musicSources={musicSources}
          />

          <HorizontalMusicSourceList
            title={'Friends'}
            musicSources={musicSources}
          />

          <View style={{ marginVertical: 10 }} />
        </View>
      </MainScreenContainer>
    );
  }
}
