/**
 * ViewSpotifyPlaylistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';

export default class ViewSpotifyPlaylistScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'View Spotify Playlist'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title={'<Playlist Name Here>'}>
    //     <Text>ViewSpotifyPlaylistScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
