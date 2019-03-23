/**
 * FriendsMenuScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class FriendsMenuScreen extends React.Component<Props, State> {
  render() {
    return (
      <SubScreenContainer
        title={'My Friends'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
  }
  //   return (
  //     <SubScreenContainer title='My Friends'>
  //       <Text>FriendsMenuScreen</Text>
  //       <Button
  //         title='Add Friend'
  //         onPress={() => NavigationService.navigate('AddFriend')}
  //       />
  //     </SubScreenContainer>
  //   );
  // }
}
