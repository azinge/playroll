/**
 * ViewSpotifyPlaylistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import MusicSourceList from '../../shared/Lists/MusicSourceList';
import { ListSpotifyPlaylistTracksQuery } from '../../../graphql/requests/Spotify';
import NavigationService from '../../../services/NavigationService';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

export default class ViewSpotifyPlaylistScreen extends React.Component<Props> {
  render() {
    const playlistID =
      this.props.navigation && this.props.navigation.getParam('playlistID');
    console.log('Playlist id ' + playlistID);
    return (
      <SubScreenContainer
        title={'View Spotify Playlist'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <ListSpotifyPlaylistTracksQuery variables={{ playlistID: playlistID }}>
          {({ loading, error, data }) => {
            console.log(error && error.message);
            console.log(
              data && data.private && data.private.listSpotifyPlaylistTracks
            );
            return (
              <View style={{ marginBottom: 45, flex: 1 }}>
                {/* <FlatList
                  data={
                    data && data.private && data.private.listSpotifyPlaylistTracks
                  }
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  style={{ marginBottom: 35 }}
                /> */}
                <MusicSourceList
                  sources={
                    data &&
                    data.private &&
                    data.private.listSpotifyPlaylistTracks
                  }
                />
              </View>
            );
          }}
        </ListSpotifyPlaylistTracksQuery>
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title={'<Playlist Name Here>'}>
    //     <Text>ViewSpotifyPlaylistScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
