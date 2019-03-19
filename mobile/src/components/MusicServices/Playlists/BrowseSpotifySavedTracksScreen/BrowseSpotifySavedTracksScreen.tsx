/**
 * BrowseSpotifySavedTracksScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class BrowseSpotifySavedTracksScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'My Spotify Saved Tracks'}>
        <Text>BrowseSpotifySavedTracksScreen</Text>
      </SubScreenContainer>
    );
  }
}
