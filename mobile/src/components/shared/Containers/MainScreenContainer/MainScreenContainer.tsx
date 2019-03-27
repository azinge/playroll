/**
 * MainScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import MainScreenHeader from '../../Headers/MainScreenHeader';

export interface Props {
  hideBottomBar?: boolean;
  hideSearchIcon?: boolean;
  disableBounce?: boolean;
  renderHeader?: () => JSX.Element;
}

interface State {}

export default class MainScreenContainer extends React.Component<Props, State> {
  render() {
    return (
      <Collapsible
        min={isIphoneX() ? 48 : 19}
        backgroundColor={'purple'}
        renderHeader={
          this.props.renderHeader
            ? this.props.renderHeader()
            : this.renderHeader()
        }
        renderContent={this.renderContent()}
        bounces={!this.props.disableBounce}
      />
    );
  }
  renderHeader() {
    return (
      <MainScreenHeader
        hideBottomBar={this.props.hideBottomBar}
        hideSearchIcon={this.props.hideSearchIcon}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
