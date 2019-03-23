/**
 * SearchScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SearchScreenHeader from '../../Headers/SearchScreenHeader';
import { HeaderIconType } from '../../../../themes/Icons';

export interface Props {
  title?: string;
  icons?: HeaderIconType[];
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  renderHeader?: () => JSX.Element;
}

interface State {}

export default class SearchScreenContainer extends React.Component<
  Props,
  State
> {
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
    return (
      <SearchScreenHeader
        title={this.props.title}
        icons={this.props.icons}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
