/**
 * BrowseAppleMusicPlaylistsScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class BrowseAppleMusicPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Apple Music Playlists'>
        <Text>BrowseAppleMusicPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
