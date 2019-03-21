/**
 * SettingsScreen
 */

import * as React from 'react';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'Settings'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='Settings'>
    //     <Text>SettingsScreen</Text>
    //     <Button
    //       title='Music Services'
    //       onPress={() => {
    //         NavigationService.navigate('MusicServiceSettingsMenu');
    //       }}
    //     />
    //   </SubScreenContainer>
    // );
  }
}
