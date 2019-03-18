/**
 * MusicServicePlaylistsMenuScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class MusicServicePlaylistsMenuScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Playlists'>
        <Text>MusicServicePlaylistsMenuScreen</Text>
      </SubScreenContainer>
    );
  }
}
