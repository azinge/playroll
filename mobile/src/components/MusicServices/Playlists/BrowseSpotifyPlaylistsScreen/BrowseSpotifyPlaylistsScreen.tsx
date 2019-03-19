/**
 * BrowseSpotifyPlaylistsScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class BrowseSpotifyPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'My Spotify Playlists'}>
        <Text>BrowseSpotifyPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
