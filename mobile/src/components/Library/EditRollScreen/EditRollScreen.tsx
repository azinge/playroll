/**
 * EditRollScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class EditRollScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'Edit Roll'} modal>
        <Text>EditRollScreen</Text>
      </SubScreenContainer>
    );
  }
}
