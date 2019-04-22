/**
 * SettingsScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  Switch,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './SettingsScreen.styles';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import NavigationService from '../../../services/NavigationService';

export default class SettingsScreen extends React.Component {
  state = { switchValue: false };
  toggleSwitch = value => {
    // onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    // state changes according to switch
    // which will result in re-render the text
  }
  render() {
    return (
      <SubScreenContainer
        title={'Settings'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        {/* <PlaceholderList numItems={20} overlayText={'Coming Soon...'} /> */}
        <View
          style={{
            marginTop: 10,
          }}
        >
          {/* Dark Mode */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.disabledText}>Dark Mode</Text>
              <Switch
                disabled
                style={styles.darkModeSwitch}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </View>
          </TouchableOpacity> */}

          {/* Music Service Settings */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('MusicServiceSettings');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.enabledText}>Music Service Settings</Text>
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

          {/* Delete Account */}
          {/* <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('');
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.disabledText}>Delete Account</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='Settings'>
    //     <Text>SettingsScreen</Text>
    //     <Button
    //       title='Music Services'
    //       onPress={() => {
    //         NavigationService.navigate('MusicServiceSettings');
    //       }}
    //     />
    //   </SubScreenContainer>
    // );
  }
}
