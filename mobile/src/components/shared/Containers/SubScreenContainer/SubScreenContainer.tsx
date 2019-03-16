/**
 * SubScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubScreenHeader from '../../Headers/SubScreenHeader';

export interface Props {
  title: string;
  renderHeader?: () => JSX.Element;
}

interface State {}

export default class SubScreenContainer extends React.Component<Props, State> {
  render() {
    return (
      <Collapsible
        max={45}
        min={isIphoneX() ? 41 : 19}
        backgroundColor={'purple'}
        renderHeader={
          this.props.renderHeader
            ? this.props.renderHeader()
            : this.renderHeader()
        }
        renderContent={this.renderContent()}
      />
    );
  }
  renderHeader() {
    return <SubScreenHeader title={this.props.title} />;
  }
  renderContent() {
    return this.props.children;
  }
}
