/**
 * SpotifySettingsScreen
 */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';
import { Button } from 'react-native-elements';

import styles from './SpotifySettingsScreen.styles';

export default class SpotifySettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Spotify Settings'>
        <View
          style={{
            marginTop: 10,
          }}
        >
          {/* Default Music Service */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('');
            }}
          >
            <View style={styles.defaultContainer}>
              <Text style={styles.enabledText}>Default Music Service</Text>
              <Text style={styles.defaultServiceText}>Spotify</Text>
            </View>
          </TouchableOpacity> */}

          {/* Connect To Spotify */}
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('ConnectSpotify');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.enabledText}>Connect To Spotify</Text>
            </View>
          </TouchableOpacity>

          {/* Apple Music Settings */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('AppleMusicSettings');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.enabledText}>Apple Music</Text>
            </View>
          </TouchableOpacity> */}

          {/* YouTube Settings */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('YouTubeSettings');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.enabledText}>YouTube</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        {/* <Button
          title="Spotify Settings"
          onPress={() => {
            NavigationService.navigate("SpotifySettings");
          }}
        />
        <Button
          title="Apple Music Settings"
          onPress={() => {
            NavigationService.navigate("AppleMusicSettings");
          }}
        />
        <Button
          title="YouTube Settings"
          onPress={() => {
            NavigationService.navigate("YouTubeSettings");
          }}
        /> */}
      </SubScreenContainer>
    );
  }
}
