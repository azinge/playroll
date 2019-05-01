/**
 * ConnectSpotifyScreen
 */

import * as React from 'react';
import { Text, SafeAreaView, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Linking, WebBrowser } from 'expo';
import url from 'url';

import styles from './ConnectSpotifyScreen.styles';
import { RegisterSpotifyAuthCodeMutation } from '../../../graphql/requests/Spotify/RegisterSpotifyAuthCodeMutation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import DropdownAlert from 'react-native-dropdownalert';
import { CurrentUserSpotifyStatusQuery } from '../../../graphql/requests/Spotify';
import NavigationService from '../../../services/NavigationService';

export type Props = {};

type State = {
  code: string;
};

export default class ConnectSpotifyScreen extends React.Component<
  Props,
  State
> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleOpenSpotifyAuthView() {
    const scope =
      'user-read-private+user-library-read+user-read-email+playlist-modify-public+playlist-modify-private';
    const responseType = 'code';
    const clientID = 'e5149b4616b84918911f9419a279d23b';
    // const redirectURI = `http://app.playroll.io`;
    const redirectURI = `https://app-dev.playroll.io`;
    const authParams = `client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`;
    const uri = `https://accounts.spotify.com/authorize?${authParams}`;
    WebBrowser.openBrowserAsync(uri);
  }

  handleRedirect(result) {
    console.log(result);
    if (result.url) {
      WebBrowser.dismissBrowser();
      const obj = url.parse(result.url, true);
      this.setState({ code: obj.query.code });
    } else {
      throw 'Error connecting to spotify';
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleRedirect);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleRedirect);
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
            <RegisterSpotifyAuthCodeMutation
              onCompleted={() => {
                setTimeout(() => NavigationService.goBack(), 1000);
              }}
              onError={err => {
                console.log(err);
              }}
            >
              {(registerSpotifyAuthCode, { loading }) => {
                const { code: stateCode } = this.state;
                if (stateCode !== '') {
                  this.setState({ code: '' }, async () => {
                    await registerSpotifyAuthCode({
                      variables: { code: stateCode, devMode: true },
                      // variables: { code: stateCode },
                    });
                  });
                }
                return (
                  <Button
                    title='Connect to Spotify'
                    titleStyle={{ fontWeight: 'bold' }}
                    containerStyle={[
                      styles.connectButton,
                      {
                        borderRadius: 80,
                        width: '75%',
                        height: 50,
                      },
                    ]}
                    onPress={() => {
                      this.handleOpenSpotifyAuthView();
                    }}
                    buttonStyle={{
                      borderRadius: 80,
                      height: 50,
                      backgroundColor: '#af00bc',
                    }}
                    raised
                    loading={loading}
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
