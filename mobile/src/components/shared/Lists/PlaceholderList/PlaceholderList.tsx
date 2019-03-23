/**
 * PlaceholderList
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';

import styles from './PlaceholderList.styles';

export interface Props {
  title?: string;
  overlayText?: string;
  numItems: number;
}

interface State {}

export default class PlaceholderList extends React.Component<Props, State> {
  render() {
    return (
      <View>
        {this.props.title && (
          <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
            <Text style={[styles.title, { color: 'grey' }]}>
              {this.props.title}
            </Text>
          </View>
        )}
        <View>
          <FlatList
            data={Array(this.props.numItems).fill('')}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => `${i}`}
            extraData={this.state}
            renderItem={() => {
              return (
                <View
                  style={{
                    height: 68,
                    backgroundColor: 'lightgrey',
                    borderRadius: 7,
                    flex: 1,
                    alignItems: 'center',
                    margin: 10,
                    opacity: 0.5,
                  }}
                />
              );
            }}
          />
          <Text
            style={[
              styles.title,
              {
                color: 'grey',
                position: 'absolute',
                top: 12,
                right: 12,
                opacity: 0.8,
                textAlign: 'right',
              },
            ]}
          >
            {this.props.overlayText}
          </Text>
        </View>
      </View>
    );
  }
}
