/**
 * ConnectTidalScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';

export default class ConnectTidalScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'Connect To Tidal'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='Connect To Tidal' modal>
    //     <Text>ConnectTidalScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
