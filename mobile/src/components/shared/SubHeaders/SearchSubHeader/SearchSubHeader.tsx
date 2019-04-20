/**
 * SearchSubHeader
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './SearchSubHeader.styles';
import { SearchBar } from 'react-native-elements';

export interface Props {}

interface State {
  search: string;
}

export default class SearchSubHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  updateSearch = search => {
    this.setState({ search });
  }

  render() {
    return (
      <SearchBar
        placeholder='Search'
        lightTheme
        onChangeText={this.updateSearch}
        value={this.state.search}
        containerStyle={{
          //   backgroundColor: 'purple',
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        // inputContainerStyle={{ backgroundColor: 'white' }}
      />
    );
  }
}
