/**
 * BrowseYouTubePlaylistsScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class BrowseYouTubePlaylistsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'My YouTube Playlists'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='My YouTube Playlists'>
    //     <Text>BrowseYouTubePlaylistsScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
