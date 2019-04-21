/**
 * MusicServiceSettingsScreen
 */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './MusicServiceSettingsScreen.styles';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';
import { Button } from 'react-native-elements';

export default class MusicServiceSettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'Music Service Settings'}
        contentContainerStyle={{ marginTop: 10 }}
      >
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

          {/* Spotify Settings */}
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('SpotifySettings');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.enabledText}>Spotify</Text>
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
