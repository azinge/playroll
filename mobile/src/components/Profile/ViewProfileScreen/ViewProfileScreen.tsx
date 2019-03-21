/**
 * ViewProfileScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class ViewProfileScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'My Public Profile'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title={'<Profile Name Here>'}>
    //     <Text>ViewProfileScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
