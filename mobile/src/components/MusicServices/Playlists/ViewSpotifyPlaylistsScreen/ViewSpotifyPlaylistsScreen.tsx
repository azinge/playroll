/**
 * ViewSpotifyPlaylistsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ViewSpotifyPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'My Spotify Playlists'}>
        <Text>ViewSpotifyPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
