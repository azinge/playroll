/**
 * SubScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubScreenHeader from '../../Headers/SubScreenHeader';
import { HeaderIconType } from '../../../../themes/Icons';

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderItem?: (obj: any) => any;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class SubScreenContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      key: `${this.props.title},${this.props.flatList}`,
    };
  }
  componentWillReceiveProps(nextProps, prevState) {
    const key = `${nextProps.title}${this.props.flatList}`;
    if (key !== prevState.key) {
      this.setState({ key });
    }
  }
  render() {
    return (
      <Collapsible
        key={this.state.key}
        max={45}
        min={isIphoneX() ? 41 : 19}
        backgroundColor={'purple'}
        renderHeader={
          this.props.renderHeader
            ? this.props.renderHeader()
            : this.renderHeader()
        }
        renderContent={this.renderContent()}
        flatList={this.props.flatList}
        data={this.props.data}
        keyExtractor={this.props.keyExtractor}
        renderItem={this.props.renderItem}
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
