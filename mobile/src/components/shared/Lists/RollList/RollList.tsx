/**
 * RollList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Roll } from '../../../../graphql/types';

import styles from './RollList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { DeleteRollMutation } from '../../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import RollCard from '../../Cards/RollCard';

export interface Props {
  rolls: Roll[];
  readOnly?: boolean;
  disableManage?: boolean;
  onMoveEnd?: (args: { data: Roll[] }) => void;
}

interface State {
  rolls: Roll[];
  prevRolls: Roll[];
}

export default class RollList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      prevRolls: props.rolls,
      rolls: props.rolls,
    };
    this.renderItem = this.renderItem.bind(this);
  }
  renderReadOnlyItem({ item: roll }) {
    return <RollCard roll={roll} readOnly />;
  }

  // componentWillReceiveProps(props, nextProps) {
  //   console.log('hello');
  //   console.log(props, nextProps);
  //   if (nextProps.rolls) {
  //     this.setState({ rolls: nextProps.rolls });
  //   } else if (props.rolls && props.rolls !== props.prevRolls) {
  //     this.setState({ rolls: props.rolls });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rolls !== this.props.rolls) {
      console.log('true');
      this.setState({ rolls: this.props.rolls });
    }
  }

  renderItem({ item: roll, move, moveEnd, isActive }) {
    return (
      <RollCard
        roll={roll}
        onPressIn={move}
        onPressOut={moveEnd}
        disableManage
      />
    );
  }

  render() {
    return this.props.readOnly ? (
      <FlatList
        data={this.state.rolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={roll => `${roll.id}`}
        extraData={this.state}
        renderItem={this.renderReadOnlyItem}
      />
    ) : (
      <DraggableFlatList
        data={this.state.rolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={roll => `${roll.id}`}
        extraData={this.state}
        renderItem={this.renderItem}
        scrollPercent={5}
        onMoveEnd={args => {
          this.setState({ rolls: args.data, prevRolls: this.state.rolls });
          return this.props.onMoveEnd && this.props.onMoveEnd(args);
        }}
      />
    );
  }
}
