/**
 * BrowseSpotifySavedTracksScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';

export default class BrowseSpotifySavedTracksScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'My Spotify Saved Tracks'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title={'My Spotify Saved Tracks'}>
    //     <Text>BrowseSpotifySavedTracksScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}