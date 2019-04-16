/**
 * ConnectYouTubeScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class ConnectYouTubeScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'Connect To YouTube'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='Connect To YouTube' modal>
    //     <Text>ConnectYouTubeScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
