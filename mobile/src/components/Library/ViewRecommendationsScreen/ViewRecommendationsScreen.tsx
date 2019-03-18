/**
 * ViewRecommendationsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class ViewRecommendationsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'My Recommendations'}>
        <Text>ViewRecommendationsScreen</Text>
      </SubScreenContainer>
    );
  }
}
