/**
 * ViewPlaylistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ViewPlaylistScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'<Playlist Name Here>'}>
        <Text>ViewPlaylistScreen</Text>
      </SubScreenContainer>
    );
  }
}
