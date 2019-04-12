/**
 * GenerateTracklistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './GenerateTracklistScreen.styles';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {}

interface State {}

export default class GenerateTracklistScreen extends React.Component<
  Props,
  State
> {
  render() {
    return (
      <SubScreenContainer
        title={'Generate Tracklist'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
  }
}
