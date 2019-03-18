/**
 * ViewTidalPlaylistsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ViewTidalPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Tidal Playlists'>
        <Text>ViewTidalPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
