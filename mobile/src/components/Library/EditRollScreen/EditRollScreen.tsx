/**
 * EditRollScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';

export default class EditRollScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer renderHeader={this.renderHeader}>
        <Text>EditRollScreen</Text>
      </SubScreenContainer>
    );
  }
  renderHeader() {
    return <SubScreenHeader title={'Edit Roll'} modal />;
  }
}
