/**
 * SubScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubScreenHeader from '../../Headers/SubScreenHeader';
import { HeaderIconType } from '../../../../themes/Icons';
import { SafeAreaView } from 'react-navigation';
import { ViewStyle, StyleProp, RefreshControl } from 'react-native';

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  renderSubHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderFlatListHeader?: () => JSX.Element;
  renderFlatListFooter?: () => JSX.Element;
  renderFlatListEmptyComponent?: () => JSX.Element;
  renderItem?: (obj: any) => any;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class SubScreenContainer extends React.Component<Props, State> {
  getRefreshProps() {
    const { flatList, refreshing, onRefresh } = this.props;
    if (!onRefresh) {
      return {};
    }
    if (flatList) {
      return { refreshing, onRefresh };
    } else {
      return {
        refreshControl: (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ),
      };
    }
  }
  render() {
    return (
      <Collapsible
        max={45}
        min={isIphoneX() ? 48 : 20}
        backgroundColor={'white'}
        renderHeader={
          this.props.renderHeader
            ? this.props.renderHeader()
            : this.renderHeader()
        }
        renderContent={this.renderContent()}
        contentContainerStyle={this.props.contentContainerStyle}
        flatList={this.props.flatList}
        data={this.props.data}
        keyExtractor={this.props.keyExtractor}
        ListHeaderComponent={
          this.props.renderFlatListHeader
            ? this.props.renderFlatListHeader()
            : undefined
        }
        ListFooterComponent={
          this.props.renderFlatListFooter
            ? this.props.renderFlatListFooter()
            : undefined
        }
        ListEmptyComponent={
          this.props.renderFlatListEmptyComponent
            ? this.props.renderFlatListEmptyComponent()
            : undefined
        }
        renderItem={this.props.renderItem}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        {...this.getRefreshProps()}
      />
    );
  }
  renderHeader() {
    return (
      <SubScreenHeader
        title={this.props.title}
        modal={this.props.modal}
        icons={this.props.icons}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
