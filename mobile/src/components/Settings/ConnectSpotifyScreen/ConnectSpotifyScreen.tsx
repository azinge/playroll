/**
 * ConnectSpotifyScreen
 */

import * as React from 'react';
import { Text, SafeAreaView, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';
import url from 'url';

import styles from './ConnectSpotifyScreen.styles';
import { RegisterSpotifyAuthCodeMutation } from '../../../graphql/requests/Spotify/RegisterSpotifyAuthCodeMutation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import DropdownAlert from 'react-native-dropdownalert';

export default class ConnectSpotifyScreen extends React.Component {
  dropdown: DropdownAlert;

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
      <View style={{ flex: 1 }}>
        <SubScreenContainer title='Connect to Spotify' modal>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={styles.spotifyIcon}
              source={require('../../../assets/spotifyIcon.png')}
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
                        return this.dropdown.alertWithType(
                          'info',
                          'Success',
                          'Successfully Connected Your Spotify Account!'
                        );
                      } catch (err) {
                        console.log(err);
                        return this.dropdown.alertWithType(
                          'error',
                          'Error',
                          "We're sorry, Please try again." + err
                        );
                      }
                    }}
                  />
                );
              }}
            </RegisterSpotifyAuthCodeMutation>
          </View>
        </SubScreenContainer>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
