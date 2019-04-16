/**
 * BrowseFriendsScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowseFriendsScreen extends React.Component<Props, State> {
  render() {
    return (
      <SubScreenContainer
        title={'My Friends'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            width: 300,
            padding: 5,
            borderRadius: 10,
            alignItems: 'flex-start',
          }}
          onPress={() => {}}
        >
          <Icon
            name='search'
            color='white'
            containerStyle={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
  }
  //   return (
  //     <SubScreenContainer title='My Friends'>
  //       <Text>BrowseFriendsScreen</Text>
  //       <Button
  //         title='Add Friend'
  //         onPress={() => NavigationService.navigate('AddFriend')}
  //       />
  //     </SubScreenContainer>
  //   );
  // }
}
