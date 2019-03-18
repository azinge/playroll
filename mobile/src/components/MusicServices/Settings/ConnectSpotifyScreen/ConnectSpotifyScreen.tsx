/**
 * ConnectSpotifyScreen
 */

import * as React from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';
import url from 'url';

import styles from './ConnectSpotifyScreen.styles';
import { RegisterSpotifyAuthCodeMutation } from '../../../../graphql/requests/Spotify/RegisterSpotifyAuthCodeMutation';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ConnectSpotifyScreen extends React.Component {
  async handleOpenSpotifyAuthView(): Promise<string> {
    const scope =
      'user-read-private+user-library-read+user-read-email+playlist-modify-public+playlist-modify-private';
    const responseType = 'code';
    const clientID = 'e5149b4616b84918911f9419a279d23b';
    const redirectURI = 'http://app.playroll.io';
    const authParams = `client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`;
    const uri = `https://accounts.spotify.com/authorize?${authParams}`;
    let result = await WebBrowser.openAuthSessionAsync(uri);
    if (result.type === 'success') {
      const obj = url.parse(result.url, true);
      return obj.query.code;
    }
    throw 'Error connecting to spotify';
  }

  render() {
    return (
      <SubScreenContainer title='Connect to Spotify'>
        <Text>ConnectSpotifyScreen</Text>
        <Image
          style={styles.spotifyIcon}
          source={require('../../../../assets/spotifyIcon.png')}
        />
        <RegisterSpotifyAuthCodeMutation>
          {registerSpotifyAuthCode => {
            return (
              <Button
                title='Connect to Spotify'
                containerStyle={styles.connectButton}
                onPress={async () => {
                  try {
                    const code = await this.handleOpenSpotifyAuthView();
                    registerSpotifyAuthCode({ variables: { code } });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            );
          }}
        </RegisterSpotifyAuthCodeMutation>
      </SubScreenContainer>
    );
  }
}
