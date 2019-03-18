/**
 * ViewAppleMusicPlaylistsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ViewAppleMusicPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Apple Music Playlists'>
        <Text>ViewAppleMusicPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
