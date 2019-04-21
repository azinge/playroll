/**
 * HomeScreen
 */

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import HomeCarousel from './HomeCarousel';
import { musicSources } from '../../../static/mockData';
import styles from './HomeScreen.styles';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import HorizontalComingSoonList from '../../shared/Lists/HorizontalComingSoonList';
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
          {/* <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.title}>Suggested Playrolls</Text>
          </View> */}

          {/* <TouchableOpacity onPress={() => {}}> */}
          <HomeCarousel numItems={5} />
          {/* </TouchableOpacity> */}

          {/* <HorizontalMusicSourceList
            title={'Discovery Queue'}
            musicSources={musicSources}
          /> */}

          <HorizontalPlaceholderList
            title={'New Releases'}
            numItems={5}
            overlayText={'Coming Soon...'}
          />

          <PlaceholderList
            title={'Popular Playrolls'}
            numItems={3}
            overlayText={'Coming Soon...'}
          />
        </View>
      </MainScreenContainer>
    );
  }
}
