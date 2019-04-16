/**
 * RecommendToFriendScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class RecommendToFriendScreen extends React.Component<
  Props,
  State
> {
  render() {
    return (
      <SubScreenContainer
        title={'Recommend To Friend'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
  }
}
