/**
 * MusicServicePlaylistsMenuScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import { CurrentUserSpotifyStatusQuery } from '../../../../graphql/requests/Spotify/';

export default class MusicServicePlaylistsMenuScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Playlists'>
        <CurrentUserSpotifyStatusQuery>
          {({ loading, error, data }) => {
            return (
              <Text>
                {data && data.private && data.private.currentUserSpotifyStatus}
              </Text>
            );
          }}
        </CurrentUserSpotifyStatusQuery>
        <Text>MusicServicePlaylistsMenuScreen</Text>
      </SubScreenContainer>
    );
  }
}
