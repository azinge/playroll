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
// import HorizontalComingSoonList from '../../shared/Lists/HorizontalComingSoonList';
import HorizontalPlaceholderList from '../../shared/Lists/HorizontalPlaceholderList';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  render() {
    return (
      <MainScreenContainer>
        <View style={{ marginTop: 5, flex: 1 }}>
          <HomeCarousel
            title={'Your Featured Playrolls'}
            numItems={5}
            overlayText={'Coming Soon...'}
          />

          {/* <HorizontalPlaceholderList
            title={'Discovery Queues'}
            numItems={5}
            overlayText={'Coming Soon...'}
          /> */}

          <PlaceholderList
            title={'Recommendations'}
            numItems={5}
            overlayText={'Coming Soon...'}
          />
        </View>
      </MainScreenContainer>
    );
  }
}
