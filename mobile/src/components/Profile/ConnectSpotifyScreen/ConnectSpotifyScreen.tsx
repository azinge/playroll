/**
 * ConnectSpotifyScreen
 */

import * as React from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants, WebBrowser } from 'expo';
import styles from './ConnectSpotifyScreen.styles';

export default class ConnectSpotifyScreen extends React.Component {
  async handleOpenSpotifyAuthView() {
    const url =
      'https://accounts.spotify.com/en/login?continue=https:%2F%2Faccounts.spotify.com%2Fauthorize%3Fclient_id%3De5149b4616b84918911f9419a279d23b%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8888%252Fcallback%26response_type%3Dcode%26scope%3Duser-read-private%2Buser-library-read%2Buser-read-email%2Bplaylist-modify-public%2Bplaylist-modify-private';
    let result = await WebBrowser.openAuthSessionAsync(
      url,
      Constants.linkingUrl,
    );
    console.log('result', result);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ConnectSpotifyScreen</Text>
        <Image
          style={styles.spotifyIcon}
          source={require('../../../assets/spotifyIcon.png')}
        />
        <Button
          title='Connect to Spotify'
          containerStyle={styles.connectButton}
          onPress={() => {
            this.handleOpenSpotifyAuthView();
          }}
        />
      </SafeAreaView>
    );
  }
}
