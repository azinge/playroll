/**
 * ConnectAppleMusicScreen
 */

import * as React from 'react';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class ConnectAppleMusicScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'Connect To Apple Music'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='Connect To Apple Music' modal>
    //     <Text>ConnectAppleMusicScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
