/**
 * BrowseTidalPlaylistsScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class BrowseTidalPlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='My Tidal Playlists'>
        <Text>BrowseTidalPlaylistsScreen</Text>
      </SubScreenContainer>
    );
  }
}
