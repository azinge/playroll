/**
 * LibraryMenuScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';

import Collapsible from 'react-native-collapsible-header';
import styles from './LibraryMenuScreen.styles';
import NavigationService from '../../../services/NavigationService';
import MainScreenHeader from '../../shared/Headers/MainScreenHeader';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class LibraryMenuScreen extends React.Component<Props, State> {
  render() {
    return (
      <Collapsible
        max={45}
        min={isIphoneX() ? 41 : 19}
        backgroundColor={'purple'}
        renderHeader={this.renderHeader()}
        // renderContent is not needed if using FlatList
        renderContent={this.renderContent()}

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
    );
  }

  renderHeader() {
    return <MainScreenHeader />;
  }

  renderContent() {
    return (
      <View style={{ marginTop: 5, flex: 1 }}>
        {/* Your Playrolls */}
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('BrowsePlayrolls');
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.enabledText}>Your Playrolls</Text>
          </View>
        </TouchableOpacity>
        {/* Your Discovery Queues */}
        {/* <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('ViewDiscoveryQueue');
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.disabledText}>Your Discovery Queues</Text>
          </View>
        </TouchableOpacity> */}
        {/* Your Reommendations */}
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('BrowseRecommendations');
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.disabledText}>Your Recommendations</Text>
            {/* {this.renderRecommendationsNotification()} */}
          </View>
        </TouchableOpacity>
        {/* Your Playlists */}
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('MusicServicePlaylistsMenu');
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.enabledText}>Your Playlists</Text>
            {this.renderMusicServiceIcons()}
          </View>
        </TouchableOpacity>

        {/* <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.disabledText}>
            Made For You
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => {}} style={styles.disabledText}>
            Saved Playrolls
          </Text>
        </View> */}
        {/* <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text onPress={() => {}} style={styles.title}>
            Recently Viewed
          </Text>
        </View> */}
        <PlaceholderList
          title={'Recently Viewed'}
          numItems={10}
          overlayText={'Coming Soon...'}
        />
        {/* <ScrollView
          style={{ marginLeft: 15, marginVertical: 10, paddingBottom: 10 }}
        >
          {musicSources.map((val, idx) => {
            return (
              <TouchableOpacity onPress={() => {}} key={idx}>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 5,
                    flexDirection: 'row',
                  }}
                  key={idx}
                >
                  <View
                    style={{
                      borderColor: 'white',
                      shadowColor: 'gray',
                      shadowOffset: {
                        width: 2,
                        height: 3,
                      },
                      shadowRadius: 3,
                      shadowOpacity: 0.2,
                    }}
                  >
                    <Image style={styles.image} source={{ uri: val.cover }} />
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 90,
                    }}
                  >
                    <Text style={styles.sourceTitle} numberOfLines={1}>
                      {val.name}
                    </Text>
                    {val.creator && (
                      <Text style={styles.sourceCreator} numberOfLines={1}>
                        {val.creator}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
      </View>
    );
  }
  renderMusicServiceIcons() {
    const musicServiceIcons = [
      {
        name: 'tidal',
        source: require('../../../assets/tidalIcon.png'),
        authenticated: false,
        playlistsNav: () => NavigationService.navigate('BrowseTidalPlaylists'),
        connectNav: () => NavigationService.navigate('ConnectTidal'),
      },
      {
        name: 'appleMusic',
        source: require('../../../assets/appleMusicIcon.png'),
        authenticated: false,
        playlistsNav: () =>
          NavigationService.navigate('BrowseAppleMusicPlaylists'),
        connectNav: () => NavigationService.navigate('ConnectAppleMusic'),
      },
      {
        name: 'spotify',
        source: require('../../../assets/spotifyIconBlack.png'),
        authenticated: true,
        playlistsNav: () =>
          NavigationService.navigate('BrowseSpotifyPlaylists'),
        connectNav: () => NavigationService.navigate('ConnectSpotify'),
      },
    ];
    const unauthenticatedMusicServiceIcons = musicServiceIcons.filter(
      msi => !msi.authenticated
    );
    const authenticatedMusicServiceIcons = musicServiceIcons.filter(
      msi => msi.authenticated
    );
    return (
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
      >
        <View style={{ flexDirection: 'row', opacity: 0.2 }}>
          {unauthenticatedMusicServiceIcons.map(msi => (
            <TouchableHighlight
              //   onPress={msi.connectNav}
              style={styles.musicServiceButtonContainer}
              key={msi.name}
            >
              <View>
                <Image
                  style={styles.musicServiceButton}
                  resizeMode={'contain'}
                  source={msi.source}
                />
                <View
                  style={[
                    styles.musicServiceButtonActivityIcon,
                    { backgroundColor: 'grey' },
                  ]}
                />
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {authenticatedMusicServiceIcons.map(msi => (
            <TouchableHighlight
              onPress={msi.playlistsNav}
              style={styles.musicServiceButtonContainer}
              key={msi.name}
              underlayColor='rgba(255,255,255,0)'
            >
              <View>
                <Image
                  style={styles.musicServiceButton}
                  resizeMode={'contain'}
                  source={msi.source}
                />
                <View
                  style={[
                    styles.musicServiceButtonActivityIcon,
                    { backgroundColor: 'green' },
                  ]}
                />
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    );
  }
  renderRecommendationsNotification() {
    return (
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
      >
        <View
          style={{
            backgroundColor: 'darkred',
            paddingHorizontal: 5,
            marginRight: 16,
            borderRadius: 5,
            minWidth: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>5</Text>
        </View>
      </View>
    );
  }
}
