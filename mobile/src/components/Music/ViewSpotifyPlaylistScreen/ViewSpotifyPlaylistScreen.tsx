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
import Icons from '../../../themes/Icons';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

export default class ViewSpotifyPlaylistScreen extends React.Component<Props> {
  render() {
    const playlist =
      this.props.navigation && this.props.navigation.getParam('playlist');
    delete playlist.__typename;
    return (
      <ListSpotifyPlaylistTracksQuery
        variables={{ playlistID: playlist.providerID }}
      >
        {({ loading, error, data }) => {
          console.log(error && error.message);
          console.log(
            data && data.private && data.private.listSpotifyPlaylistTracks
          );
          return (
            <SubScreenContainer
              title={'View Spotify Playlist'}
              contentContainerStyle={{ marginTop: 10 }}
              icons={[
                {
                  ...Icons.menuIcon,
                  onPress: () => {
                    NavigationService.navigate('ManageRoll', {
                      currentSource: playlist,
                    });
                  },
                },
              ]}
            >
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
                  onPress={musicSource => {
                    NavigationService.navigate('ManageRoll', {
                      currentSource: musicSource,
                    });
                  }}
                />
              </View>
            </SubScreenContainer>
          );
        }}
      </ListSpotifyPlaylistTracksQuery>
    );
    // return (
    //   <SubScreenContainer title={'<Playlist Name Here>'}>
    //     <Text>ViewSpotifyPlaylistScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
